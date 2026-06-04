import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuthentication'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { PlayerPage } from './pages/Player'
import { defaultFavorites } from './data/data'
import './App.css'

function MainContent() {
  const { user, logout } = useAuth()
  const [favorites, setFavorites] = useState(defaultFavorites)

  function toggleFavorite(channelId) {
    setFavorites((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            user={user}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onLogout={logout}
          />
        }
      />
      <Route
        path="/player/:channelId"
        element={
          <PlayerPage
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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


