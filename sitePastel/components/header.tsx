"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Cardápio", href: "#cardapio" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
        >
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-xl font-bold">P</span>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-background"
            )}>
              Pastelaria do Zé
            </span>
            <span className={cn(
              "text-xs tracking-widest uppercase transition-colors duration-300",
              isScrolled ? "text-muted-foreground" : "text-background/80"
            )}>
              Desde 1985
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300 relative group",
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  : "text-background/90 hover:text-background"
              )}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA & Phone */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="tel:+5511999999999" 
            className={cn(
              "flex items-center gap-2 text-sm transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-background"
            )}
          >
            <Phone className="w-4 h-4" />
            (11) 99999-9999
          </a>
          <Link
            href="#contato"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
          >
            Fazer Pedido
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "md:hidden p-2 transition-colors",
            isScrolled ? "text-foreground" : "text-background"
          )}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-lg transition-all duration-500 ease-out",
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center gap-8 py-12">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-serif text-foreground hover:text-primary transition-all duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contato"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground text-lg rounded-full transition-all duration-300 hover:bg-primary/90"
          >
            Fazer Pedido
          </Link>
        </nav>
      </div>
    </header>
  )
}
