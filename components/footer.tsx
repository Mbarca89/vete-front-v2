import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">VP</span>
              </div>
              <span className="font-bold text-lg">Veterinaria del Parque</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Cuidando la salud de tu mascota con profesionalismo y dedicación desde 2008.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Consultas Generales</li>
              <li>Vacunación</li>
              <li>Cirugía</li>
              <li>Emergencias</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Horarios</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Lunes - Viernes: 9:00 - 20:00</li>
              <li>Sábado: 9:00 - 14:00</li>
              <li>Domingo: Cerrado</li>
              <li>Emergencias: 24/7</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 Veterinaria del Parque. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
