"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { CartButton } from "@/components/cart"

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
          {/* Substitua este div pela sua logo personalizada */}
          <Image
            src="./images/logo.png"
            alt="Logo Melinhas"
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className={cn(
              "font-serif text-xl font-bold tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-background"
            )}>
              Melinhas
            </span>
            <span className={cn(
              "text-xs tracking-widest uppercase transition-colors duration-300",
              isScrolled ? "text-muted-foreground" : "text-background/80"
            )}>
              Desde 1986
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

        {/* CTA & Cart */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+5516981094196"
            className={cn(
              "flex items-center gap-2 text-sm transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-background"
            )}
          >
            <Phone className="w-4 h-4" />
            (16) 98109-4196
          </a>
          <div className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-foreground" : "text-background"
          )}>
            <CartButton />
          </div>
        </div>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center gap-2">
          <div className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-foreground" : "text-background"
          )}>
            <CartButton />
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-2 transition-colors",
              isScrolled ? "text-foreground" : "text-background"
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
        </nav>
      </div>
    </header>
  )
}
