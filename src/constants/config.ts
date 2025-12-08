export const API_CONFIG = {
  FACEIT_API_URL_BASE: 'https://open.faceit.com/data/v4',
} as const

export const PLAYER_IDS = {
  zix: '92111634-df87-4a37-9955-aaff879eb335',
  marjan_bajs: '335912fe-3a1c-4d29-9e27-49e23e1eac7e',
  thraxxboi: '57b14f41-41f0-4a5f-afd5-812a63de5873',
  rok: '3b8e55b2-e9c2-4553-8fd5-a29821df26f3',
} as const

export const CACHE_CONFIG = {
  PLAYERS_CACHE_TIME: 60 * 1000, // 1 minute
  PLAYERS_STALE_TIME: 30 * 1000, // 30 seconds
  MATCH_STATS_STALE_TIME: 60 * 1000, // 1 minute
} as const

export const PERFORMANCE_THRESHOLDS = {
  MIN_ADR: 70,
  MIN_KD: 1,
} as const

export const IMAGE_DIMENSIONS = {
  PLAYER_AVATAR: { width: 28, height: 28 },
  MAP_IMAGE: { width: 200, height: 129 },
  DEATH_ICON: { width: 18, height: 18 },
} as const
