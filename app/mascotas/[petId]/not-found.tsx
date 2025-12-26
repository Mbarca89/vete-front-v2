import Link from "next/link"
import { PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8 inline-block">
          <div className="relative">
            <PawPrint className="w-32 h-32 text-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Mascota no encontrada</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, no pudimos encontrar la información de esta mascota. Verifica el enlace o contacta con la
          clínica.
        </p>
        <Link href="/">
          <Button size="lg" className="gap-2">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
