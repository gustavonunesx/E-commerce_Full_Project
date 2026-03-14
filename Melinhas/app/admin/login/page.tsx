"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setErro("Email ou senha incorretos")
      setCarregando(false)
      return
    }

    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="bg-background p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Melinhas
          </h1>
          <p className="text-muted-foreground mt-2">
            Acesso restrito — administração
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>

          {erro && (
            <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}