// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { CastId, CastIdT } from '../farcaster/cast-id';
import { ReactionType } from '../farcaster/reaction-type';


export class GetReactionsByCastRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):GetReactionsByCastRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsGetReactionsByCastRequest(bb:flatbuffers.ByteBuffer, obj?:GetReactionsByCastRequest):GetReactionsByCastRequest {
  return (obj || new GetReactionsByCastRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsGetReactionsByCastRequest(bb:flatbuffers.ByteBuffer, obj?:GetReactionsByCastRequest):GetReactionsByCastRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new GetReactionsByCastRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

cast(obj?:CastId):CastId|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new CastId()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

type():ReactionType|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint16(this.bb_pos + offset) : null;
}

static startGetReactionsByCastRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addCast(builder:flatbuffers.Builder, castOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, castOffset, 0);
}

static addType(builder:flatbuffers.Builder, type:ReactionType) {
  builder.addFieldInt16(1, type, 0);
}

static endGetReactionsByCastRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  builder.requiredField(offset, 4) // cast
  return offset;
}

static createGetReactionsByCastRequest(builder:flatbuffers.Builder, castOffset:flatbuffers.Offset, type:ReactionType|null):flatbuffers.Offset {
  GetReactionsByCastRequest.startGetReactionsByCastRequest(builder);
  GetReactionsByCastRequest.addCast(builder, castOffset);
  if (type !== null)
    GetReactionsByCastRequest.addType(builder, type);
  return GetReactionsByCastRequest.endGetReactionsByCastRequest(builder);
}

unpack(): GetReactionsByCastRequestT {
  return new GetReactionsByCastRequestT(
    (this.cast() !== null ? this.cast()!.unpack() : null),
    this.type()
  );
}


unpackTo(_o: GetReactionsByCastRequestT): void {
  _o.cast = (this.cast() !== null ? this.cast()!.unpack() : null);
  _o.type = this.type();
}
}

export class GetReactionsByCastRequestT {
constructor(
  public cast: CastIdT|null = null,
  public type: ReactionType|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const cast = (this.cast !== null ? this.cast!.pack(builder) : 0);

  return GetReactionsByCastRequest.createGetReactionsByCastRequest(builder,
    cast,
    this.type
  );
}
}
