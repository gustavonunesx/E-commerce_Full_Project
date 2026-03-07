"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react"
import Image from "next/image"

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Av.+Bruno+Ruggiero+Filho,+1115+-+Parque+Santa+Felicia+Jardim"
const WHATSAPP_NUMBER = "5516999999999" // Substitua pelo número real

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Av. Bruno Ruggiero Filho, 1115 - Parque Santa Felicia Jardim",
    href: GOOGLE_MAPS_URL,
  },
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: "(16) 99999-9999",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@melinhas.com.br",
    href: "mailto:contato@melinhas.com.br",
  },
  {
    icon: Clock,
    label: "Horário de Funcionamento",
    value: "Seg - Sáb: 8h às 20h | Dom: 9h às 15h",
    href: null,
  },
]

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="contato" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              Monte seu pedido no cardápio e finalize pelo WhatsApp!
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
                    {item.href ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div 
              className={cn(
                "flex flex-col sm:flex-row gap-4 mt-10 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: "600ms" }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de fazer um pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-full transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir pelo WhatsApp
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full transition-all duration-300 hover:bg-secondary/90 hover:scale-105 hover:shadow-xl"
              >
                <Navigation className="w-5 h-5" />
                Como Chegar
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className={cn(
              "transition-all duration-1000 ease-out delay-200",
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            )}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pastelaria-ambiente.jpg"
                alt="Ambiente da Melinhas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-8">
                <div>
                  <p className="text-background font-serif text-2xl mb-2">
                    Ambiente familiar e acolhedor
                  </p>
                  <p className="text-background/80 text-sm">
                    Venha tomar um cafezinho com a gente!
                  </p>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "block mt-6 bg-muted rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Abrir no Google Maps</p>
                  <p className="text-sm text-muted-foreground">
                    Av. Bruno Ruggiero Filho, 1115
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Parque Santa Felicia Jardim
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
