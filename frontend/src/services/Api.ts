import axios from 'axios'

const Api = () => {
  const getToken = () => {
    const item: any = localStorage.getItem('authToken')
    try {
      return JSON.parse(item)
    } catch (e) {
      return null
    }
  }

  const token = getToken()

  const instance = axios.create({
    baseURL: 'http://localhost:3000/v1',
    headers: token && { uid: token.uid, client: token.client, 'access-token': token['access-token'] },
  })

  return instance
}

export default Api()
