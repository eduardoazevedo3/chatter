import { useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { User } from '../../types/user.type'
import Container from '../../components/Containter'
import Card from '../../components/Card'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import Typography from '../../components/Typography'

const UserForm = () => {
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
      const { data } = await axios.get(`http://localhost:3000/v1/users/${id}`)
      reset(data)
    }

    if (id) {
      getUser()
    }
  }, [id, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id !== undefined) {
        await axios.patch(`http://localhost:3000/v1/users/${id}`, { user: { ...data } })
      } else {
        await axios.post('http://localhost:3000/v1/users', { user: { ...data } })
      }
      history.push('/users')
    } catch (error) {
      console.log(error.response.status)
      alert(error)
      // renderErrors(error.response.data)
    }
  })

  return (
    <Container>
      <Typography variant="h1">
        <Link to="/users">{id ? 'Edit User' : 'New User'}</Link>
      </Typography>
      <Card>
        <form onSubmit={onSubmit}>
          <TextField id="user-full-name" name="full_name" label="Full Name" errors={errors} register={register} required />
          <TextField type="email" id="user-email" name="email" label="Email" errors={errors} register={register} required />
          <TextField id="user-phone-number" name="phone_number" label="Phone Number" errors={errors} register={register} required />
          <TextField id="user-password" name="password" label="Password" errors={errors} register={register} required />

          <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '2px solid #121214' }}>
            <Button primary type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default UserForm
