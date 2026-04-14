import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./admin-sidebar"

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
      <AdminSidebar email={user.email ?? ""} />

      {/* Content — padding-top on mobile to clear the fixed top bar */}
      <main className="flex-1 overflow-auto p-6 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
