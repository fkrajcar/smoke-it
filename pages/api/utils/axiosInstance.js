import axios from 'axios'

import { config } from '../../../config/misc'

// we will use this amazing free dog api and declare our client
const client = (() => {
  return axios.create({
    baseURL: config.FACEIT_API_URL_BASE,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN}`,
    },
  })
})()

// the axiosInstance function which will destructure the response
// as it's shown in the Dog CEO API
const axiosInstance = async function (options) {
  // success handler
  const onSuccess = function (response) {
    const { data } = response

    return data
  }

  // error handler
  const onError = function (error) {
    return Promise.reject(error.response)
  }

  // adding success and error handlers to client
  return client(options).then(onSuccess).catch(onError)
}

export default axiosInstance
