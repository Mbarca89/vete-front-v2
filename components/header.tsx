"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageCircle, ShoppingBagIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navigate = (id?: string, path?: string) => {
    setIsMobileMenuOpen(false)

    if (path) {
      router.push(path)
      return
    }

    if (isHome && id) {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: "smooth" })
    } else if (id) {
      router.push(`/#${id}`)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.webp" alt="Veterinaria del Parque" width={48} height={48} className="w-12 h-12" />
            <span className="font-bold text-xl text-primary">Veterinaria del Parque</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate(undefined, "/")}
              className="text-foreground hover:text-primary"
            >
              Inicio
            </button>

            <button
              onClick={() => navigate("servicios")}
              className="text-foreground hover:text-primary"
            >
              Servicios
            </button>

            <button
              onClick={() => navigate("nosotros")}
              className="text-foreground hover:text-primary"
            >
              Equipo
            </button>

            <button
              onClick={() => navigate("contacto")}
              className="text-foreground hover:text-primary"
            >
              Contacto
            </button>
            <Link href="/tienda">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Tienda
                </Button>
              </Link>
            <a href="https://wa.me/5492664392132" target="window">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <MessageCircle className="w-4 h-4 mr-2" />
                Escribinos
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("equipo")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Equipo
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-foreground hover:text-primary transition-colors text-left"
              >
                Contacto
              </button>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Escribinos
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
