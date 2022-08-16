import mongoose, { model, Schema } from 'mongoose'

export interface IMatch {
  match_id: string
}

const matchSchema = new Schema<IMatch>({
  match_id: { type: String },
})

export const Match =
  mongoose?.models?.Match || model<IMatch>('Match', matchSchema)
