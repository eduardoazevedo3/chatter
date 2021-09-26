import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { User } from '../../types/user.type'
import Container from '../../components/Containter'
import Card from '../../components/Card'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import Form from '../../components/Form'
import Box from '../../components/Box'
import useApi from '../../hooks/api'
import Sidebar from '../Sidebar'

const UserForm = () => {
  const api = useApi()
  const history = useHistory()
  const { id } = useParams() as any
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    mode: 'onBlur',
  })

  useEffect(() => {
    const getUser = async () => {
      const { data } = await api.get(`/users/${id}`)
      reset(data)
    }

    if (id) {
      getUser()
    } else {
      reset({})
    }
  }, [id, api, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id !== undefined) {
        await api.patch(`/users/${id}`, { user: { ...data } })
      } else {
        await api.post('/users', { user: { ...data } })
      }
      history.push('/users')
    } catch (e: any) {
      console.log(e.response.status)
      alert(e)
      // renderErrors(error.response.data)
    }
  })

  return (
    <Container>
      <Typography variant="h1">{id ? 'Edit User' : 'New User'}</Typography>
      <Sidebar />
      <Card>
        <Form onSubmit={onSubmit}>
          <TextField id="user-full-name" name="full_name" label="Full Name" errors={errors} register={register} required />
          <TextField type="email" id="user-email" name="email" label="Email" errors={errors} register={register} required />
          <TextField id="user-phone-number" name="phone_number" label="Phone Number" errors={errors} register={register} required />
          <TextField type="password" id="user-password" name="password" label="Password" errors={errors} register={register} required />

          <Box mt={25} pt={15} align="center" style={{ borderTop: '2px solid #121214' }}>
            <Button type="button" color="default" mr={10} onClick={() => history.push('/users')}>
              Voltar
            </Button>
            <Button type="submit" color="primary">
              Salvar
            </Button>
          </Box>
        </Form>
      </Card>
    </Container>
  )
}

export default UserForm
