import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserLogin } from '../../types/user.type'

const Login = () => {
  const [user, setUser] = useState<UserLogin>({} as UserLogin)

  useEffect(() => {
    console.log('useEffect')
  }, [])

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const field = e.currentTarget
    const data = { ...user, [field.name]: field.value }
    setUser(data)
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Seja bem-vindo</p>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <a href="/">Home URL</a>
      </p>
      <div>
        <label htmlFor="user-email">E-mail</label>
        <div>
          <input type="email" name="email" id="user-email" onChange={handleChange} />
        </div>
      </div>
      <div>
        <label htmlFor="user-password">Senha</label>
        <div>
          <input type="password" name="password" id="user-password" onChange={handleChange} />
        </div>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button type="button">Entrar</button>
      </div>
    </div>
  )
}

export default Login
