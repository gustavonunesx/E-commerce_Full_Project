"use client"

import { useCart } from "@/contexts/cart-context"
import { useProducts } from "@/contexts/products-context"
import { X, Plus, Minus, ShoppingBag, Trash2, MessageCircle } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()
  const { updateProduct, getProductById } = useProducts()

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n"
    items.forEach((item) => {
      message += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`
    })
    message += `\nTotal: ${formatPrice(totalPrice)}`
    return encodeURIComponent(message)
  }

  const salvarPedidoNoSupabase = async () => {
    const response = await fetch("/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, total: totalPrice }),
    })

    if (!response.ok) {
      console.error("Erro ao salvar pedido")
    }
  }

  const handleWhatsAppOrder = async () => {
    const message = generateWhatsAppMessage()
    await salvarPedidoNoSupabase()
    window.open(`https://wa.me/5516981094196?text=${message}`, "_blank")
    clearCart()
    setIsCartOpen(false)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transition-transform duration-500 ease-out flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <h2 className="font-serif text-2xl">Sua Sacola</h2>
            <span className="bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Sua sacola está vazia</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Adicione itens do cardápio
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-muted p-4 rounded-xl">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-background rounded-full p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-semibold text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="font-serif text-2xl text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 text-white rounded-full transition-all duration-300 hover:bg-green-700 hover:scale-[1.02] hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Finalizar pelo WhatsApp
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-3 py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Limpar sacola
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export function CartButton() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative p-2 hover:bg-muted rounded-full transition-colors"
      aria-label="Abrir carrinho"
    >
      <ShoppingBag className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full animate-in zoom-in duration-300">
          {totalItems}
        </span>
      )}
    </button>
  )
}