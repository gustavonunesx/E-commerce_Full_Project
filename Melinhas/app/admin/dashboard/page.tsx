import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Se não está logado, manda para o login
  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        Bem-vindo ao Dashboard
      </h1>
      <p className="text-muted-foreground">
        Logado como: {user.email}
      </p>
    </div>
  )
}