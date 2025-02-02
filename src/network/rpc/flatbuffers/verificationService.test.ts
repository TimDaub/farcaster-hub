import Server from '~/network/rpc/flatbuffers/server';
import { jestBinaryRocksDB } from '~/storage/db/jestUtils';
import Client from '~/network/rpc/flatbuffers/client';
import MessageModel from '~/storage/flatbuffers/messageModel';
import Factories from '~/test/factories/flatbuffer';
import Engine from '~/storage/engine/flatbuffers';
import { SignerAddModel, VerificationAddEthAddressModel } from '~/storage/flatbuffers/types';
import { Wallet, utils } from 'ethers';
import { generateEd25519KeyPair } from '~/utils/crypto';
import ContractEventModel from '~/storage/flatbuffers/contractEventModel';
import { KeyPair } from '~/types';
import { HubError } from '~/utils/hubErrors';

const db = jestBinaryRocksDB('flatbuffers.rpc.verificationService.test');
const engine = new Engine(db);

let server: Server;
let client: Client;

beforeAll(async () => {
  server = new Server(engine);
  const port = await server.start();
  client = new Client(port);
});

afterAll(async () => {
  client.close();
  await server.stop();
});

const fid = Factories.FID.build();
const wallet = Wallet.createRandom();
let custodyEvent: ContractEventModel;
let signer: KeyPair;
let signerAdd: SignerAddModel;

let verificationAdd: VerificationAddEthAddressModel;

beforeAll(async () => {
  custodyEvent = new ContractEventModel(
    await Factories.IdRegistryEvent.create(
      { to: Array.from(utils.arrayify(wallet.address)), fid: Array.from(fid) },
      { transient: { wallet } }
    )
  );

  signer = await generateEd25519KeyPair();
  const signerAddData = await Factories.SignerAddData.create({
    body: Factories.SignerBody.build({ signer: Array.from(signer.publicKey) }),
    fid: Array.from(fid),
  });
  signerAdd = new MessageModel(
    await Factories.Message.create({ data: Array.from(signerAddData.bb?.bytes() ?? []) }, { transient: { wallet } })
  ) as SignerAddModel;

  const verificationBody = await Factories.VerificationAddEthAddressBody.create({}, { transient: { fid } });
  const verificationData = await Factories.VerificationAddEthAddressData.create({
    fid: Array.from(fid),
    body: verificationBody.unpack(),
  });
  verificationAdd = new MessageModel(
    await Factories.Message.create({ data: Array.from(verificationData.bb?.bytes() ?? []) }, { transient: { signer } })
  ) as VerificationAddEthAddressModel;
});

describe('getVerification', () => {
  beforeEach(async () => {
    await engine.mergeIdRegistryEvent(custodyEvent);
    await engine.mergeMessage(signerAdd);
  });

  test('succeeds', async () => {
    await engine.mergeMessage(verificationAdd);
    const result = await client.getVerification(fid, verificationAdd.body().addressArray() ?? new Uint8Array());
    expect(result._unsafeUnwrap()).toEqual(verificationAdd);
  });

  test('fails if verification is missing', async () => {
    const result = await client.getVerification(fid, verificationAdd.body().addressArray() ?? new Uint8Array());
    expect(result._unsafeUnwrapErr().errCode).toEqual('not_found');
  });

  test('fails without address', async () => {
    const result = await client.getVerification(fid, new Uint8Array());
    expect(result._unsafeUnwrapErr()).toEqual(new HubError('bad_request.validation_failure', 'address is missing'));
  });

  test('fails without fid', async () => {
    const result = await client.getVerification(
      new Uint8Array(),
      verificationAdd.body().addressArray() ?? new Uint8Array()
    );
    expect(result._unsafeUnwrapErr()).toEqual(new HubError('bad_request.validation_failure', 'fid is missing'));
  });
});

describe('getVerificationsByFid', () => {
  beforeEach(async () => {
    await engine.mergeIdRegistryEvent(custodyEvent);
    await engine.mergeMessage(signerAdd);
  });

  test('succeeds', async () => {
    await engine.mergeMessage(verificationAdd);
    const verifications = await client.getVerificationsByFid(fid);
    // The underlying buffers are different, so we can't compare full objects
    expect(verifications._unsafeUnwrap().map((msg) => msg.hash())).toEqual([verificationAdd.hash()]);
  });

  test('returns empty array without messages', async () => {
    const verifications = await client.getVerificationsByFid(fid);
    expect(verifications._unsafeUnwrap()).toEqual([]);
  });
});
