import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useDebounce from '../../hooks/debounce'
import { TUser } from '../../types/User.type'
import Card from '../../components/Card'
import Container from '../../components/Containter'
import Typography from '../../components/Typography'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import useApi from '../../hooks/api'
import Sidebar from '../Sidebar'
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../components/Table'

const User = () => {
  const [users, setUsers] = useState<TUser[]>([])
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

  useEffect(() => {
    getUsers(debouncedQuery)
  }, [debouncedQuery, getUsers])

  return (
    <Container>
      <Typography variant="h1">Users</Typography>
      <Sidebar />
      <Card>
        <TextField name="query" value={query} label="Search" mt={0} onChange={(e) => setQuery(e.currentTarget.value)} />
      </Card>
      <Card>
        <Table width="100%" striped hover>
          <TableHead>
            <TableRow>
              <TableCell variant="th" align="left" width="100">
                ID
              </TableCell>
              <TableCell variant="th" align="left">
                Name
              </TableCell>
              <TableCell variant="th" align="left" width="100">
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell width="100">{user.id}</TableCell>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.fullName}</Link>
                </TableCell>
                <TableCell width="100" align="center">
                  <Button type="button" color="danger" size="small" confirm="Confirma a exclusão?" onClick={() => deleteUsers(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Container>
  )
}

export default User
