import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IAgent {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

// Explicitly define `_id` in the interface
export interface IAgentDocument extends IAgent, Document {
  _id: Types.ObjectId;
}

const agentSchema = new Schema<IAgentDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

export const Agent = mongoose.model<IAgentDocument>('Agent', agentSchema);
