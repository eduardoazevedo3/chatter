import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Alert from '../../components/Alert'
import Box from '../../components/Box'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Container from '../../components/Containter'
import Form from '../../components/Form'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import useStorage from '../../hooks/storage'
import { TUserLogin } from '../../types/User.type'

const Login = () => {
  const [token, setToken] = useStorage('authToken')
  const [alert, setAlert] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserLogin>({
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(async (params) => {
    try {
      if (token) return

      setLoading(true)
      const { headers } = await axios.post('http://localhost:3000/v1/auth/sign_in', { ...params })

      setToken({
        uid: headers.uid,
        client: headers.client,
        expiry: headers.expiry,
        'access-token': headers['access-token'],
        'token-type': headers['token-type'],
      })

      history.push('/')
    } catch (e: any) {
      setValue('password', '')
      setFocus('password')
      setAlert(e.response.data.errors.join(','))
    } finally {
      setLoading(false)
    }
  })

  return (
    <Container flex>
      <Typography variant="h1">Login</Typography>
      <Card width="500px">
        {alert && <Alert severity="error">{alert}</Alert>}
        <Form onSubmit={onSubmit}>
          <TextField id="user-email" name="email" label="Email" errors={errors} register={register} large required />
          <TextField
            type="password"
            id="user-password"
            name="password"
            label="Password"
            errors={errors}
            register={register}
            large
            required
          />
          <Box mt={25}>
            <Button type="submit" color="primary" size="large" disabled={loading} fullWidth>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </Box>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
