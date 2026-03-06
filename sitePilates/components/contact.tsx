"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "(11) 99999-9999",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@equilibriopilates.com.br",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg - Sex: 6h às 21h | Sáb: 8h às 14h",
  },
]

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  }

  return (
    <section id="contato" className="py-24 md:py-32 bg-card" ref={ref}>
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
            <span className="inline-block text-sm tracking-widest text-primary uppercase mb-4">
              Contato
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-balance">
              Vamos começar sua jornada?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Entre em contato conosco para agendar sua aula experimental
              gratuita ou tirar suas dúvidas sobre nossas modalidades.
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
                  <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            id="agendar"
            className={cn(
              "transition-all duration-1000 ease-out delay-200",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background p-8 md:p-10 rounded-2xl shadow-xl"
            >
              <h3 className="font-serif text-2xl mb-6">
                Agende sua Aula Experimental
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all duration-300 placeholder:text-muted-foreground/50"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    Mensagem (opcional)
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/50"
                    placeholder="Conte-nos um pouco sobre seus objetivos..."
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
                      <span>Enviar Mensagem</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
