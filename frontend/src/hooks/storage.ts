import { useCallback, useState } from 'react'

export default function useStorage(key: string) {
  const [state, setState] = useState(() => {
    const item: any = localStorage.getItem(key)
    try {
      return JSON.parse(item)
    } catch (e) {
      return null
    }
  })

  const setItem = useCallback(
    (value: any) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [key]
  )

  const removeItem = useCallback(() => {
    localStorage.removeItem(key)
  }, [key])

  const set = useCallback(
    (value: any) => {
      setItem(value)
      setState(value)
    },
    [setItem]
  )

  const remove = useCallback(() => {
    removeItem()
    setState(undefined)
  }, [removeItem])

  return [state, set, remove]
}
