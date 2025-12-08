import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import https from 'https'

import { API_CONFIG } from '../constants/config'

interface ApiClientConfig {
  baseURL: string
  token?: string
}

class ApiClient {
  private client: AxiosInstance

  constructor(config: ApiClientConfig) {
    // Create HTTPS agent that can handle self-signed certificates in development
    const httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    })

    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        ...(config.token && { Authorization: `Bearer ${config.token}` }),
      },
      httpsAgent,
      // Add timeout to prevent hanging requests
      timeout: 30000,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Server responded with error status
          console.error('API Error:', {
            status: error.response.status,
            data: error.response.data,
            url: error.config?.url,
          })
        } else if (error.request) {
          // Request made but no response
          console.error('Network Error:', error.message)
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

// Create singleton instance
export const faceitApiClient = new ApiClient({
  baseURL: API_CONFIG.FACEIT_API_URL_BASE,
  token: process.env.NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN,
})

export default ApiClient
