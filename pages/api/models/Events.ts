import mongoose, { Schema, model } from 'mongoose'

export interface IEventPayloadEntity {
  id: string
}

export interface IEventPayload {
  id: string
  created_at: string
  updated_at: string
  entity: IEventPayloadEntity
}

export interface IEvent {
  transaction_id: string
  event: string
  event_id: string
  third_party_id: string
  app_id: string
  timestamp: string
  payload: IEventPayload
}

const eventSchema = new Schema<IEvent>({
  transaction_id: { type: String },
  event: { type: String },
  event_id: { type: String },
  third_party_id: { type: String },
  app_id: { type: String },
  timestamp: { type: String },
  payload: {
    id: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
    entity: {
      id: { type: String },
    },
  },
})

export const Event =
  mongoose.models.Event || model<IEvent>('Event', eventSchema)
