import { config } from '../../../config/misc'
import axiosInstance from './axiosInstance'

export default class MatchService {
  static getPlayers() {
    const requests = Object.values(config.PLAYER_IDS).map((playerId) => {
      return {
        url: '/players/' + playerId,
        method: 'GET',
      }
    })

    return Promise.all(requests.map((data) => axiosInstance(data)))
  }

  static getPlayerMatches() {
    const requests = Object.values(config.PLAYER_IDS).map((playerId) => {
      return {
        url: `/players/${playerId}/history`,
        method: 'GET',
      }
    })

    return Promise.all(requests.map((data) => axiosInstance(data)))
  }
}
