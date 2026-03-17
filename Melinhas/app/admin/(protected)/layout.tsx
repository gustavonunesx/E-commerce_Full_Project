import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, LogOut } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
  { label: "Produtos", href: "/admin/products", icon: Package },
  { label: "Financeiro", href: "/admin/sales", icon: TrendingUp },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <p className="font-serif text-xl font-bold text-foreground">Melinhas</p>
          <p className="text-xs text-muted-foreground mt-0.5">Painel Administrativo</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground truncate mb-3">{user.email}</p>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}