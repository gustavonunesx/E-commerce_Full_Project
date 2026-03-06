"use client"

import Link from "next/link"
import { Instagram, Facebook, Heart, Phone, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#inicio" },
      { label: "Sobre Nós", href: "#sobre" },
      { label: "Cardápio", href: "#cardapio" },
      { label: "Depoimentos", href: "#depoimentos" },
      { label: "Contato", href: "#contato" },
    ],
  },
  {
    title: "Mais Pedidos",
    links: [
      { label: "Pastel de Carne", href: "#cardapio" },
      { label: "Pastel de Queijo", href: "#cardapio" },
      { label: "Pastel de Camarão", href: "#cardapio" },
      { label: "Caldo de Cana", href: "#cardapio" },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl font-bold">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-secondary-foreground">
                  Pastelaria do Zé
                </span>
                <span className="text-xs tracking-widest uppercase text-secondary-foreground/70">
                  Desde 1985
                </span>
              </div>
            </Link>
            <p className="mt-4 text-secondary-foreground/80 leading-relaxed max-w-sm">
              Tradição de família há mais de 40 anos. Venha saborear os melhores 
              pastéis da cidade com o caldo de cana mais fresquinho!
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-secondary-foreground/80">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-secondary-foreground/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Rua das Flores, 123 - Centro</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-secondary-foreground/20 rounded-full transition-all duration-300 hover:bg-primary hover:border-primary hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm tracking-wider uppercase mb-4 text-secondary-foreground/50">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-secondary-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            &copy; {new Date().getFullYear()} Pastelaria do Zé. Todos os
            direitos reservados.
          </p>
          <p className="text-sm text-secondary-foreground/50 flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" />{" "}
            para você
          </p>
        </div>
      </div>
    </footer>
  )
}
