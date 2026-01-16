import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import { CartProvider } from "@/components/cart/CartProvider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Veterinaria del Parque - Cuidado Profesional para tu Mascota",
  description:
    "Clínica veterinaria de confianza en Argentina. Servicios completos de salud animal, equipo profesional y atención de emergencia.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">
        <CartProvider>
          <Header />
          <main className="">
            {children}
            <Toaster richColors position="top-center" duration={2000} />
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
