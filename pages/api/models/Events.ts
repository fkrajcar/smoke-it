import mongoose, { Schema, model } from 'mongoose'

export const enum MatchStatus {
  CREATED = 'match_object_created',
  ABORTED = 'match_status_aborted',
  CANCELLED = 'match_status_cancelled',
  CONFIGURING = 'match_status_configuring',
  FINISHED = 'match_status_finished',
  READY = 'match_status_ready',
}

export interface Player {
  id: string
  nickname: string
  avatar: string
  game_name: string
}

export interface TeamEntity {
  id: string
  name: string
  avatar: string
  leader_id: string
  roster: Player[]
}

export interface IEventPayloadEntity {
  id: string
}

export interface IEventPayload {
  id: string
  created_at: string
  updated_at: string
  entity: IEventPayloadEntity
  teams: TeamEntity[]
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
    teams: { type: Array },
  },
})

export const Event =
  mongoose.models.Event || model<IEvent>('Event', eventSchema)
