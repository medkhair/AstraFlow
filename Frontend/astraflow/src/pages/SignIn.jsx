import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuthentication } from "@/hooks/useAuthentication"

export default function SignInPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login, isLoading, error } = useAuthentication()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(username, password)
      navigate("/dashboard", { replace: true })
    } catch {
      // error state is set by the hook
    }
  }

  return (
    <main className="min-h-[80dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl bg-card p-6 ring-1 ring-border">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Admin Sign In</h1>
        <p className="text-sm text-muted-foreground mb-6">Welcome back. Sign in to your AstraFlow admin panel.</p>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm text-muted-foreground">Username</span>
            <input
              type="text"
              className="h-10 rounded-md bg-background ring-1 ring-border px-3 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your username"
              required
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-muted-foreground">Password</span>
            <input
              type="password"
              className="h-10 rounded-md bg-background ring-1 ring-border px-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="h-10 rounded-md bg-brand text-background disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-brand">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}

