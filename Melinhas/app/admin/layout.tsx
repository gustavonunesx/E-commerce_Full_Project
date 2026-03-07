// app/admin/layout.tsx
"use client"

import Link from "next/link"
import { useEffect, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"

function isAdminAuthenticated() {
  if (typeof window === "undefined") return false
  return localStorage.getItem("melinhas-admin") === "true"
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === "/admin/login"
  const isAuthenticated = useMemo(isAdminAuthenticated, [pathname])

  useEffect(() => {
    if (isLoginPage) {
      if (isAuthenticated) router.replace("/admin")
      return
    }

    if (!isAuthenticated) {
      router.replace("/admin/login")
    }
  }, [isAuthenticated, isLoginPage, router])

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/sales", label: "Vendas / Receita" },
    { href: "/admin/products", label: "Produtos" },
    { href: "/admin/products/new", label: "Adicionar produto" },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50">
      {!isLoginPage && (
        <aside className="w-64 border-r bg-white">
          <div className="p-4 font-bold text-lg">Admin</div>
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded px-3 py-2 ${
                  pathname === item.href ? "bg-slate-100 font-semibold" : "hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-4">
            <button
              onClick={() => {
                localStorage.removeItem("melinhas-admin")
                router.replace("/admin/login")
              }}
              className="w-full rounded bg-destructive px-3 py-2 text-sm font-semibold text-white hover:bg-destructive/90"
            >
              Sair
            </button>
          </div>
        </aside>
      )}

      <main
        className={
          "flex-1 p-6 " +
          (isLoginPage ? "flex items-center justify-center" : "")
        }
      >
        {children}
      </main>
    </div>
  )
}