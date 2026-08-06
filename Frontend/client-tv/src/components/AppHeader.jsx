import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuthentication'
import { useSubscription } from '../hooks/useSubscription'

export function AppHeader({ search, setSearch }) {
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef(null)
  const clientId = user?.id ?? user?.clientId ?? localStorage.getItem('clientId')
  const { subscription, isLoading: subscriptionLoading } = useSubscription(clientId)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const formatDate = (value) => {
    if (!value) return '—'
    const parsedDate = new Date(value)
    if (Number.isNaN(parsedDate.getTime())) return value
    return parsedDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const subscriptionLabel = subscriptionLoading
    ? 'Loading subscription…'
    : subscription
      ? `${subscription.status || 'Subscribed'} • Ends ${formatDate(subscription.endDate || subscription.startDate)}`
      : user?.subscription?.plan || 'No subscription'

  return (
    <header className="topbar">
      <div className="topbar-brand">
        <Link to="/" className="brand-link">
            <svg
            className="brand-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <rect x="5" y="10" width="22" height="14" rx="3" fill="#7c3aed" opacity="0.2" />
            <rect x="5" y="10" width="22" height="14" rx="3" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x="2" y="6" width="22" height="14" rx="3" fill="#7c3aed" opacity="0.4" />
            <rect x="2" y="6" width="22" height="14" rx="3" stroke="#a855f7" strokeWidth="1.5" />
            </svg>
            <span className="brand-name">AstraFlow</span>
        </Link>
      </div>

      <div className="topbar-search">
        <svg viewBox="0 0 20 20" fill="currentColor" className="search-icon">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          placeholder="Search channels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="topbar-right">
        <div className="topbar-clock">
          <span className="clock-time">{formatTime(currentTime)}</span>
          <span className="clock-date">{formatDate(currentTime)}</span>
        </div>

        <div className={`topbar-user-trigger ${menuOpen ? 'open' : ''}`} ref={triggerRef}>
          <button
            type="button"
            className="topbar-user"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
          >
            <div className="user-avatar">{(user?.full_name ?? user?.username ?? '?')[0]}</div>
            <div className="user-info">
              <span className="user-name">{user?.full_name ?? user?.username}</span>
            </div>
          </button>

          <div className={`topbar-user-menu ${menuOpen ? 'visible' : ''}`}>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/support-tickets" onClick={() => setMenuOpen(false)}>Support Ticket</Link>
            <Link to="/subscription" onClick={() => setMenuOpen(false)}>Subscription</Link>
            <Link to="/" onClick={() => setMenuOpen(false)}>Settings</Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                logout()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
