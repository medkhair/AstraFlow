import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProtectedRoute from "@/routes/ProtectedRoute"
import DashboardPage from "@/pages/Dashboard"
import ChannelsPage from "@/pages/Channels"
import TicketsPage from "@/pages/Messages"
import PlansPage from "@/pages/Plans"
import PaymentsPage from "@/pages/Payments"
import ProfilePage from "@/pages/Profile"
import ClientsPage from "@/pages/Clients"
import SettingsPage from "@/pages/Settings"
import SignInPage from "@/pages/SignIn"
import SignUpPage from "@/pages/SignUp"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/channels" element={<ChannelsPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
