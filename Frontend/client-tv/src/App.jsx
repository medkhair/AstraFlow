import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuthentication'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { WaitForAccessRoute } from './routes/WaitForAccessRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { LandingPage } from './pages/LandingPage'
import { Home } from './pages/Home'
import { PlayerPage } from './pages/Player'
import { ChoosePlan } from './pages/ChoosePlan'
import { CheckOut } from './pages/CheckOut'
import { SupportTicketsPage } from './pages/SupportTickets'
import { SubscriptionPage } from './pages/SubscriptionPage'
import { ProfilePage } from './pages/ProfilePage'
import { AppHeader } from './components/AppHeader'
import { defaultFavorites } from './data/data'
import { useFavorite } from './hooks/useFavorite'
import './App.css'
import { VerifyEmail } from './pages/VerifyEmail'

function AppOutlet({ search, setSearch }) {
  return (
    <div className="tv-app">
      <AppHeader search={search} setSearch={setSearch} />
      <Outlet />
    </div>
  )
}

function MainContent() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const { favorites, isLoading: favLoading, toggleFavorite } = useFavorite()
  const favoritesList = favLoading ? defaultFavorites : favorites

  return (
    <Routes>
      <Route element={<AppOutlet search={search} setSearch={setSearch} />}>
        <Route
          path="/"
          element={
            <Home
              user={user}
              favorites={favoritesList}
              toggleFavorite={toggleFavorite}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/support-tickets"
          element={<SupportTicketsPage />}
        />
        <Route
          path="/subscription"
          element={<SubscriptionPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
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
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/optin" element={<LandingPage />} />
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


