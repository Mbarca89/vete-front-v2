"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageCircle, ShoppingBagIcon, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart/CartProvider"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const { totalItems, hydrated } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // (Opcional pero recomendado) si cambiás de ruta, cerrá el menú
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigate = (id?: string, path?: string) => {
    setIsMobileMenuOpen(false)

    if (path) {
      router.push(path)
      return
    }

    if (!id) return

    // Si estoy en home: hago scroll a la sección
    if (isHome) {
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: "smooth" })
      return
    }

    // Si NO estoy en home: vuelvo a home con hash
    router.push(`/#${id}`)
  }

  const headerBg =
    // ✅ en mobile: siempre fondo sólido
    "bg-background/95 backdrop-blur-sm shadow-sm " +
    // ✅ en desktop: transparente si no scrolleó (tu comportamiento original)
    (isScrolled ? "" : "md:bg-transparent md:backdrop-blur-0 md:shadow-none")

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => navigate(undefined, "/")}
            className="flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/logo.webp"
              alt="Veterinaria del Parque"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <span className="font-bold text-xl text-primary">Veterinaria del Parque</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("inicio")} className="text-foreground hover:text-primary">
              Inicio
            </button>
            <button onClick={() => navigate("servicios")} className="text-foreground hover:text-primary">
              Servicios
            </button>
            <button onClick={() => navigate("nosotros")} className="text-foreground hover:text-primary">
              Equipo
            </button>
            <button onClick={() => navigate("contacto")} className="text-foreground hover:text-primary">
              Contacto
            </button>

            <Link href="/tienda">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Tienda
              </Button>
            </Link>

            <a href="https://wa.me/5492664392132" target="_blank" rel="noreferrer">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Escribinos
              </Button>
            </a>

            <Link href="/carrito" className="relative inline-flex items-center">
              <ShoppingCart className="w-5 h-5" />
              {hydrated && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-border bg-background/80"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {/* ✅ importante: usar navigate() en vez de scrollToSection */}
              <button onClick={() => navigate("inicio")} className="text-foreground hover:text-primary text-left">
                Inicio
              </button>
              <button onClick={() => navigate("servicios")} className="text-foreground hover:text-primary text-left">
                Servicios
              </button>
              <button onClick={() => navigate("nosotros")} className="text-foreground hover:text-primary text-left">
                Equipo
              </button>
              <button onClick={() => navigate("contacto")} className="text-foreground hover:text-primary text-left">
                Contacto
              </button>

              {/* ✅ tienda visible en mobile */}
              <Link href="/tienda" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-primary text-primary">
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Tienda
                </Button>
              </Link>

              {/* ✅ carrito visible en mobile */}
              <Link href="/carrito" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Carrito {hydrated && totalItems > 0 ? `(${totalItems})` : ""}
                </Button>
              </Link>

              {/* ✅ WhatsApp en mobile */}
              <a href="https://wa.me/5492664392132" target="_blank" rel="noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Escribinos
                </Button>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
