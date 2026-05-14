import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardPage from "@/pages/Dashboard"
import MessagesPage from "@/pages/Messages"
import DevicesPage from "@/pages/Devices"
import ProfilePage from "@/pages/Profile"
import SecurityPage from "@/pages/Security"
import StatisticsPage from "@/pages/Statistics"
import SignInPage from "@/pages/SignIn"
import SignUpPage from "@/pages/SignUp"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
