import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { TUser } from '../../types/User.type'
import Container from '../../components/Containter'
import Card from '../../components/Card'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'
import Form from '../../components/Form'
import Box from '../../components/Box'
import useApi from '../../hooks/api'
import Sidebar from '../Sidebar'
import Alert from '../../components/Alert'

const UserForm = () => {
  const api = useApi()
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [alert, setAlert] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TUser>({
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
    const params = { user: { ...data } }

    try {
      if (id) {
        await api.patch<TUser>(`/users/${id}`, params)
      } else {
        await api.post<TUser>('/users', params)
      }
      history.push('/users')
    } catch (e: any) {
      const { data: errorFields } = e.response
      setAlert('There were some problems trying to save')

      Object.keys(errorFields).forEach((field: any) => {
        setError(field, {
          type: 'server',
          message: errorFields[field].join(', '),
        })
      })
    }
  })

  return (
    <Container>
      <Typography variant="h1">{id ? 'Edit User' : 'New User'}</Typography>
      <Sidebar />
      {alert && <Alert severity="error">{alert}</Alert>}
      <Card>
        <Form onSubmit={onSubmit}>
          <TextField id="user-full-name" name="fullName" label="Full Name" mt={5} errors={errors} register={register} />
          <TextField type="email" id="user-email" name="email" label="Email" errors={errors} register={register} required />
          <TextField id="user-phone-number" name="phoneNumber" label="Phone Number" errors={errors} register={register} required />
          <TextField type="password" id="user-password" name="password" label="Password" errors={errors} register={register} required />

          <Box mt={25} pt={15} align="center" style={{ borderTop: '2px solid #121214' }}>
            <Button type="button" color="default" mr={10} onClick={() => history.push('/users')}>
              Back
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Box>
        </Form>
      </Card>
    </Container>
  )
}

export default UserForm
