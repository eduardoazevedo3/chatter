import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../../hooks/debounce'
import { User } from '../../types/user.type'
import Card from '../../components/Card'
import Container from '../../components/Containter'
import Typography from '../../components/Typography'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import useApi from '../../hooks/api'
import Sidebar from '../Sidebar'

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState<string>('')
  const api = useApi()
  const debouncedQuery = useDebounce<string>(query)

  const getUsers = useCallback(
    async (q) => {
      const { data } = await api.get(`/users?q=${q}`)
      setUsers(data)
    },
    [api]
  )

  const deleteUsers = async (id: number) => {
    await api.delete(`/users/${id}`)
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
      <Sidebar />
      <Card>
        <TextField name="query" value={query} label="Search" onChange={handleQueryChange} />
      </Card>
      <Card>
        <table width="100%">
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Name</th>
              <th align="left">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.full_name}</Link>
                </td>
                <td width="100" align="center">
                  <Button type="button" color="danger" size="small" confirm="Confirma a exclusão?" onClick={() => deleteUsers(user.id)}>
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
