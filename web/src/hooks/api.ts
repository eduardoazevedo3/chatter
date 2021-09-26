import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import useStorage from './storage'

const useApi = () => {
  const [token] = useStorage('authToken')
  const history = useHistory()

  const [state] = useState(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:3000/v1',
      headers: token && { uid: token.uid, client: token.client, 'access-token': token['access-token'] },
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
