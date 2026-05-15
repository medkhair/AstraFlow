import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  Tv,
  Users,
  CreditCard,
  Headphones,
  DollarSign,
  UserRound,
  Settings,
  ChevronFirst,
  ChevronLast,
} from "lucide-react"

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/channels", label: "Channels", icon: Tv },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/plans", label: "Plans", icon: CreditCard },
  { href: "/tickets", label: "Support", icon: Headphones },
  { href: "/payments", label: "Payments", icon: DollarSign },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ onClose }) {
  const location = useLocation()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open")
    if (saved) setOpen(saved === "1")
  }, [])

  useEffect(() => {
    localStorage.setItem("sidebar-open", open ? "1" : "0")
  }, [open])

  return (
    <aside
      className={`bg-sidebar-gradient text-white transition-[width] duration-300 rounded-l-3xl flex flex-col h-full ${
        open ? "w-52" : "w-20"
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-white/20 grid place-items-center font-bold text-sm">AF</div>
          <span className={`${open ? "block" : "hidden"} text-sm font-semibold`}>AstraFlow</span>
        </div>
        <button
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg bg-white/20 p-1.5 hover:bg-white/30"
        >
          {open ? <ChevronFirst className="size-5" /> : <ChevronLast className="size-5" />}
        </button>
      </div>

      <nav className="mt-2 flex-1">
        <ul className="flex flex-col gap-1 px-3">
          {items.map(({ href, label, icon: Icon }) => {
            const active =
              location.pathname === href ||
              (href !== "/dashboard" && location.pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={active ? "page" : undefined}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                    active ? "bg-white text-brand" : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`size-5 ${active ? "text-brand" : "text-white"}`} />
                  <span className={`${open ? "block" : "hidden"} text-sm`}>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="px-3 pb-5 pt-2">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-xs leading-5">{open ? "AstraFlow Admin Panel" : "AF"}</p>
        </div>
      </div>
    </aside>
  )
}
