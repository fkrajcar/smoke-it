import { config } from '../../../config/misc'
import axiosInstance from './axiosInstance'

export default class MatchService {
  static getRandomDog() {
    return axiosInstance({
      url: '/breeds/image/random',
      method: 'GET',
    })
  }
  static getAllDogs() {
    return axiosInstance({
      url: '/breeds/list/all',
      method: 'GET',
    })
  }
  static getPlayers() {
    const requests = Object.values(config.PLAYER_IDS).map((playerId) => {
      return {
        url: '/players/' + playerId,
        method: 'GET',
      }
    })

    return Promise.all(requests.map((data) => axiosInstance(data)))
  }
}
