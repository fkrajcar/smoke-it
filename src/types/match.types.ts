export enum MatchStatus {
  CREATED = 'match_object_created',
  ABORTED = 'match_status_aborted',
  CANCELLED = 'match_status_cancelled',
  CONFIGURING = 'match_status_configuring',
  FINISHED = 'match_status_finished',
  READY = 'match_status_ready',
}

export enum StatsProperties {
  Kills = 'Kills',
  Assists = 'Assists',
  Deaths = 'Deaths',
  KD = 'K/D Ratio',
  TeamWin = 'Team Win',
  Win = '1',
  ADR = 'ADR',
  HeadshotPercentage = 'Headshots %',
  KRRatio = 'K/R Ratio',
  MVPs = 'MVPs',
  TripleKills = 'Triple Kills',
  QuadroKills = 'Quadro Kills',
  PentaKills = 'Penta Kills',
}

export interface Player {
  player_id: string
  nickname: string
  avatar: string
  game_name?: string
  game_skill_level?: number
  membership_type?: string
  faceit_url?: string
  country?: string
}

export interface PlayerStats {
  [StatsProperties.Kills]: string
  [StatsProperties.Assists]: string
  [StatsProperties.Deaths]: string
  [StatsProperties.KD]: string
  [StatsProperties.ADR]: string
  [StatsProperties.HeadshotPercentage]?: string
  [StatsProperties.KRRatio]?: string
  [StatsProperties.MVPs]?: string
  [StatsProperties.TripleKills]?: string
  [StatsProperties.QuadroKills]?: string
  [StatsProperties.PentaKills]?: string
}

export interface PlayerWithStats extends Player {
  player_stats: PlayerStats
}

export interface TeamStats {
  'Team Win': string
  'Final Score': string
  'First Half Score': string
  'Second Half Score': string
  'Overtime score'?: string
}

export interface Team {
  team_id: string
  premade: boolean
  team_stats: TeamStats
  players: PlayerWithStats[]
}

export interface RoundStats {
  Map: string
  Score: string
  Region: string
  Rounds: string
  Winner: string
}

export interface Round {
  round_id: string
  round_stats: RoundStats
  teams: Team[]
  best_of: string
  competition_id: string
  game_id: string
  game_mode: string
  match_id: string
  match_round: string
  played: string
}

export interface MatchStats {
  rounds: Round[]
}

export interface TeamEntity {
  id: string
  name: string
  avatar: string
  leader_id: string
  roster: Player[]
}

export interface EventPayloadEntity {
  id: string
}

export interface EventPayload {
  id: string
  created_at: string
  updated_at: string
  entity: EventPayloadEntity
  teams: TeamEntity[]
}

export interface IEvent {
  id: string
  match_id?: string
  finished_at: number
  transaction_id: string
  event: string
  event_id: string
  third_party_id: string
  app_id: string
  timestamp: string
  payload: EventPayload
}

export interface MatchHistoryItem {
  match_id: string
  game_id: string
  region: string
  match_type: string
  game_mode: string
  max_players: number
  teams_size: number
  teams: {
    faction: string
    players: Array<{
      player_id: string
      nickname: string
      avatar: string
      skill_level: number
      game_player_id: string
      game_player_name: string
      faceit_url: string
    }>
  }[]
  playing_players: string[]
  competition_id: string
  competition_name: string
  competition_type: string
  organizer_id: string
  started_at: number
  finished_at: number
  results: {
    winner: string
    score: {
      [key: string]: number
    }
  }
  faceit_url: string
}

export interface PlayerMatchHistory {
  items: MatchHistoryItem[]
  start: number
  end: number
  from: number
  to: number
}

export interface ProcessedPlayerStats {
  avatar?: string
  kills: number
  assists: number
  deaths: number
  kd: number
  nickname: string
  ADR: number
  player_id?: string
}
