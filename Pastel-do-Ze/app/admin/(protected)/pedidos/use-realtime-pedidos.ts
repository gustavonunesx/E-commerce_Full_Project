"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"

export type NovoPedido = {
  id: number
  total: number
  origem: string
  criado_em: string
}

type Options = {
  onNovoPedido?: (pedido: NovoPedido) => void
}

export function useRealtimePedidos({ onNovoPedido }: Options = {}) {
  const [novos, setNovos] = useState<NovoPedido[]>([])
  const [contadorNovos, setContadorNovos] = useState(0)
  const supabase = createClient()

  const limparContador = useCallback(() => {
    setContadorNovos(0)
    setNovos([])
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel("pedidos-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pedidos",
        },
        (payload) => {
          const pedido = payload.new as NovoPedido
          setNovos((prev) => [pedido, ...prev])
          setContadorNovos((prev) => prev + 1)
          onNovoPedido?.(pedido)

          // Toca som de notificação
          try {
            const ctx = new AudioContext()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.value = 880
            gain.gain.setValueAtTime(0.3, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.4)
          } catch {
            // ignora se o navegador bloquear o som
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { novos, contadorNovos, limparContador }
}