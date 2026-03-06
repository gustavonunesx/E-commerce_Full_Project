"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube, Heart } from "lucide-react"

const footerLinks = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#inicio" },
      { label: "Sobre", href: "#sobre" },
      { label: "Modalidades", href: "#modalidades" },
      { label: "Equipe", href: "#equipe" },
      { label: "Contato", href: "#contato" },
    ],
  },
  {
    title: "Modalidades",
    links: [
      { label: "Pilates Solo", href: "#modalidades" },
      { label: "Pilates Reformer", href: "#modalidades" },
      { label: "Pilates Clínico", href: "#modalidades" },
      { label: "Pilates Gestantes", href: "#modalidades" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de Privacidade", href: "#" },
      { label: "Termos de Uso", href: "#" },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-3xl tracking-tight">
              <span className="font-light">Equilíbrio</span>
              <span className="text-primary font-medium">.</span>
            </Link>
            <p className="mt-4 text-background/70 leading-relaxed max-w-sm">
              Transformando vidas através do movimento consciente há mais de uma
              década. Venha fazer parte da nossa família.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center border border-background/20 rounded-full transition-all duration-300 hover:bg-primary hover:border-primary hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm tracking-wider uppercase mb-4 text-background/50">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors duration-300"
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
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} Equilíbrio Pilates. Todos os
            direitos reservados.
          </p>
          <p className="text-sm text-background/50 flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" />{" "}
            para seu bem-estar
          </p>
        </div>
      </div>
    </footer>
  )
}
