"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Package, TrendingUp, LogOut, Menu, X, ChefHat } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
  { label: "Produtos", href: "/admin/products", icon: Package },
  { label: "Financeiro", href: "/admin/sales", icon: TrendingUp },
]

function SidebarContent({ email, onNavigate }: { email: string; onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-serif text-base font-bold text-sidebar-foreground leading-tight">
              Pastel do Zé
            </p>
            <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest mt-0.5">
              Painel Admin
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/40 truncate mb-3">{email}</p>
        <form action="/admin/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </form>
      </div>
    </div>
  )
}

export function AdminSidebar({ email }: { email: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar flex-col shrink-0 border-r border-sidebar-border">
        <SidebarContent email={email} />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-sidebar border-b border-sidebar-border flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-sm font-bold text-sidebar-foreground">Pastel do Zé</span>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
            <SidebarContent email={email} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
