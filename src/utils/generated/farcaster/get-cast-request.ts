// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { CastId, CastIdT } from '../farcaster/cast-id';


export class GetCastRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):GetCastRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsGetCastRequest(bb:flatbuffers.ByteBuffer, obj?:GetCastRequest):GetCastRequest {
  return (obj || new GetCastRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsGetCastRequest(bb:flatbuffers.ByteBuffer, obj?:GetCastRequest):GetCastRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new GetCastRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

cast(obj?:CastId):CastId|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new CastId()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

static startGetCastRequest(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addCast(builder:flatbuffers.Builder, castOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, castOffset, 0);
}

static endGetCastRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createGetCastRequest(builder:flatbuffers.Builder, castOffset:flatbuffers.Offset):flatbuffers.Offset {
  GetCastRequest.startGetCastRequest(builder);
  GetCastRequest.addCast(builder, castOffset);
  return GetCastRequest.endGetCastRequest(builder);
}

unpack(): GetCastRequestT {
  return new GetCastRequestT(
    (this.cast() !== null ? this.cast()!.unpack() : null)
  );
}


unpackTo(_o: GetCastRequestT): void {
  _o.cast = (this.cast() !== null ? this.cast()!.unpack() : null);
}
}

export class GetCastRequestT {
constructor(
  public cast: CastIdT|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const cast = (this.cast !== null ? this.cast!.pack(builder) : 0);

  return GetCastRequest.createGetCastRequest(builder,
    cast
  );
}
}