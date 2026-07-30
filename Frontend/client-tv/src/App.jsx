import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuthentication'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { WaitForAccessRoute } from './routes/WaitForAccessRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { PlayerPage } from './pages/Player'
import { ChoosePlan } from './pages/ChoosePlan'
import { CheckOut } from './pages/CheckOut'
import { defaultFavorites } from './data/data'
import { useFavorite } from './hooks/useFavorite'
import './App.css'
import { VerifyEmail } from './pages/VerifyEmail'

function MainContent() {
  const { user, logout } = useAuth()
  const { favorites, isLoading: favLoading, toggleFavorite } = useFavorite()
  const favoritesList = favLoading ? defaultFavorites : favorites

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            user={user}
            favorites={favoritesList}
            toggleFavorite={toggleFavorite}
            onLogout={logout}
          />
        }
      />
      <Route
        path="/player/:channelId"
        element={
          <PlayerPage
            favorites={favoritesList}
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify-email"
            element={
              <ProtectedRoute>
                <VerifyEmail/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/choose-plan"
            element={
              <ProtectedRoute>
                <ChoosePlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <WaitForAccessRoute>
                  <MainContent />
                </WaitForAccessRoute>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


