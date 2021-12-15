import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import useStorage from './storage'
import { API_V1_URL } from '../constants'

const useApi = () => {
  const [token] = useStorage('authToken')
  const history = useHistory()

  const [state] = useState(() => {
    const instance = axios.create({
      baseURL: API_V1_URL,
      headers: token && {
        uid: token.uid,
        client: token.client,
        'access-token': token['access-token'],
        'Key-Inflection': 'camel',
      },
    })

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          history.push('/login')
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    )

    return instance
  })

  return state
}

export default useApi
