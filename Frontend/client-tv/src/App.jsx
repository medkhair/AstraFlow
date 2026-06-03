import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuthentication'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Player } from './pages/Player'
import { defaultFavorites } from './data/data'
import './App.css'

function MainContent() {
  const { user, logout } = useAuth()
  const [channel, setChannel] = useState(null)
  const [favorites, setFavorites] = useState(defaultFavorites)

  function handleWatch(ch) {
    setChannel(ch)
  }

  function handleBack() {
    setChannel(null)
  }

  function toggleFavorite(channelId) {
    setFavorites((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    )
  }

  if (channel) {
    return (
      <Player
        channel={channel}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onBack={handleBack}
      />
    )
  }

  return (
    <Home
      user={user}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      onWatch={handleWatch}
      onLogout={logout}
    />
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


