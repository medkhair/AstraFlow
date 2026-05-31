import { useState } from 'react'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Player } from './pages/Player'
import { defaultFavorites } from './data/data'
import './App.css'

function App() {
  const [view, setView] = useState('login')
  const [user, setUser] = useState(null)
  const [channel, setChannel] = useState(null)
  const [favorites, setFavorites] = useState(defaultFavorites)

  function handleLogin(loggedUser) {
    setUser(loggedUser)
    setView('home')
  }

  function handleWatch(ch) {
    setChannel(ch)
    setView('player')
  }

  function handleBack() {
    setView('home')
    setChannel(null)
  }

  function handleLogout() {
    setUser(null)
    setView('login')
  }

  function toggleFavorite(channelId) {
    setFavorites((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    )
  }

  if (view === 'login') return <Login onLogin={handleLogin} />
  if (view === 'player')
    return (
      <Player
        channel={channel}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onBack={handleBack}
      />
    )
  return (
    <Home
      user={user}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      onWatch={handleWatch}
      onLogout={handleLogout}
    />
  )
}

export default App

