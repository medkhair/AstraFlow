import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuthentication'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { WaitForAccessRoute } from './routes/WaitForAccessRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { PlayerPage } from './pages/Player'
import { ChoosePlan } from './pages/ChoosePlan'
import { CheckOut } from './pages/CheckOut'
import { SupportTicketsPage } from './pages/SupportTickets'
import { defaultFavorites } from './data/data'
import { useFavorite } from './hooks/useFavorite'
import './App.css'
import { VerifyEmail } from './pages/VerifyEmail'

function AppOutlet() {
  const { user, logout } = useAuth()

  return (
    <div className="tv-app">
      <header className="topbar">
        <div className="topbar-brand">
          <svg
            className="brand-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="10"
              width="22"
              height="14"
              rx="3"
              fill="#7c3aed"
              opacity="0.2"
            />
            <rect
              x="5"
              y="10"
              width="22"
              height="14"
              rx="3"
              stroke="#7c3aed"
              strokeWidth="1.5"
            />
            <rect
              x="2"
              y="6"
              width="22"
              height="14"
              rx="3"
              fill="#7c3aed"
              opacity="0.4"
            />
            <rect
              x="2"
              y="6"
              width="22"
              height="14"
              rx="3"
              stroke="#a855f7"
              strokeWidth="1.5"
            />
          </svg>
          <span className="brand-name">AstraFlow</span>
        </div>

        <div className="topbar-right">
          <Link className="support-outlet-btn" to="/support-tickets">
            Support Ticket
          </Link>

          <div className="topbar-user">
            <div className="user-avatar">{(user?.full_name ?? user?.username ?? '?')[0]}</div>
            <div className="user-info">
              <span className="user-name">{user?.full_name ?? user?.username}</span>
              <span className="user-plan">{user?.subscription?.plan}</span>
            </div>
          </div>
          <button className="signout-btn" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  )
}

function MainContent() {
  const { user } = useAuth()
  const { favorites, isLoading: favLoading, toggleFavorite } = useFavorite()
  const favoritesList = favLoading ? defaultFavorites : favorites

  return (
    <Routes>
      <Route element={<AppOutlet />}>
        <Route
          path="/"
          element={
            <Home
              user={user}
              favorites={favoritesList}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/support-tickets"
          element={<SupportTicketsPage />}
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


