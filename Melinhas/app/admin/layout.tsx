// app/admin/layout.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/sales", label: "Vendas / Receita" },
    { href: "/admin/products", label: "Produtos" },
    { href: "/admin/products/new", label: "Adicionar produto" },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50">
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
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}