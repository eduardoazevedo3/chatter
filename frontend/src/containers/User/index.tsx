import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useDebounce from '../../hooks/debounce'
import { User } from '../../types/user.type'
import Card from '../../components/Card'
import Container from '../../components/Containter'
import Typography from '../../components/Typography'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import useStorage from '../../hooks/storage'

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce<string>(query)

  // Delete me

  const [storage, setStorage, removeStorage] = useStorage('test')

  useEffect(() => {
    console.log(storage)
  }, [storage])

  // Delete me

  const getUsers = useCallback(async (q) => {
    const { data } = await axios.get(`http://localhost:3000/v1/users?q=${q}`)
    setUsers(data)
  }, [])

  const deleteUsers = async (id: number) => {
    await axios.delete(`http://localhost:3000/v1/users/${id}`)
    getUsers(query)
  }

  const handleQueryChange = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  useEffect(() => {
    getUsers(debouncedQuery)
  }, [debouncedQuery, getUsers])

  return (
    <Container>
      <Typography variant="h1">Users</Typography>
      <Card>
        <Link to="/">Home</Link>
        <Link to="/users/new" style={{ marginLeft: '20px' }}>
          New User
        </Link>
      </Card>
      <Card>
        <TextField name="query" value={query} label="Search" onChange={handleQueryChange} />
      </Card>
      <Card>
        <Button onClick={() => setStorage({ c: 'd' })} style={{ marginRight: '10px' }}>
          Local Storage 1
        </Button>
        <Button onClick={() => setStorage({ e: 'f' })} style={{ marginRight: '10px' }}>
          Local Storage 2
        </Button>
        <Button onClick={() => removeStorage()}>Local Storage 2</Button>
        <br />
        <br />
        <table width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.full_name}</Link>
                </td>
                <td>
                  <Button danger small type="button" onClick={() => deleteUsers(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Container>
  )
}

export default UserList
