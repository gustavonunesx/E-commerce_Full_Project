"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import Image from "next/image"

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua das Flores, 123 - Centro, São Paulo - SP",
  },
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: "(11) 99999-9999",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@pastelariadoze.com.br",
  },
  {
    icon: Clock,
    label: "Horário de Funcionamento",
    value: "Seg - Sáb: 8h às 20h | Dom: 9h às 15h",
  },
]

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    pedido: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState({ name: "", phone: "", pedido: "" })
    setIsSubmitting(false)
    alert("Pedido enviado com sucesso! Entraremos em contato para confirmar.")
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            )}
          >
            <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4 font-semibold">
              Contato
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
              Venha nos Visitar!
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Estamos esperando você para saborear os melhores pastéis da cidade. 
              Faça seu pedido por telefone ou WhatsApp e retire sem fila!
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-4 transition-all duration-700",
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-accent rounded-full flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-3 mt-10 px-8 py-4 bg-green-600 text-white rounded-full transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-xl",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "600ms" }}
            >
              <MessageCircle className="w-5 h-5" />
              Pedir pelo WhatsApp
            </a>
          </div>

          {/* Right Side - Form & Image */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-200",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-muted p-8 md:p-10 rounded-2xl shadow-xl mb-8"
            >
              <h3 className="font-serif text-2xl mb-6">
                Faça seu Pedido
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Seu nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
                    placeholder="Como podemos te chamar?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pedido"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Seu Pedido
                  </label>
                  <textarea
                    id="pedido"
                    value={formState.pedido}
                    onChange={(e) =>
                      setFormState({ ...formState, pedido: e.target.value })
                    }
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
                    placeholder="Ex: 2 pastéis de carne, 1 de queijo e 2 caldos de cana..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Pedido</span>
                      <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/pastelaria-ambiente.jpg"
                alt="Ambiente da Pastelaria do Zé"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-6">
                <p className="text-background font-serif text-xl">
                  Ambiente familiar e acolhedor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
