// app/admin/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const ADMIN_USERNAME = "michel"
const ADMIN_PASSWORD = "pilla"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError("Usuário ou senha incorretos")
      return
    }

    localStorage.setItem("melinhas-admin", "true")
    router.replace("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-10">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow">
        <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Acesse o painel administrativo. Usuário: <strong>admin</strong> / Senha: <strong>1234</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Usuário</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </label>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
