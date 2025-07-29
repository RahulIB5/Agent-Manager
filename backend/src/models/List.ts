// models/List.ts
import mongoose, { Document, Schema } from "mongoose"

interface IListItem {
  firstName: string
  phone: string
  notes: string
}

export interface IList extends Document {
  agentId: mongoose.Types.ObjectId
  items: IListItem[]
}

const listSchema = new Schema<IList>(
  {
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    items: [
      {
        firstName: String,
        phone: String,
        notes: String,
      },
    ],
  },
  {
    timestamps: true, // ✅ Add this
  }
)

export const List = mongoose.model<IList>("List", listSchema)
