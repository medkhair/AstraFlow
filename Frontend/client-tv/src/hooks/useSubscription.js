import { useEffect, useState } from 'react'
import { fetchClientSubscription } from '../data/crud'

export function useSubscription(clientId) {
  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(clientId))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!clientId) {
      setSubscription(null)
      setIsLoading(false)
      return
    }

    let isMounted = true

    const loadSubscription = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchClientSubscription(clientId)
        if (isMounted) {
          setSubscription(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err)
          setSubscription(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadSubscription()

    return () => {
      isMounted = false
    }
  }, [clientId])

  return { subscription, isLoading, error }
}
