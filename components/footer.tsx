import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className=" flex items-center justify-center">
                <Image src="/images/logo.webp" alt="Veterinaria del Parque" width={48} height={48} className="w-12 h-12" />
              </div>
              <span className="font-bold text-lg">Veterinaria del Parque</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Cuidando la salud de tu mascota con profesionalismo y dedicación desde 2011.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Consultas Generales</li>
              <li>Análisis clínicos</li>
              <li>Diagnóstico por imágenes</li>
              <li>Cirugía</li>
              <li>Internación</li>
              <li>Vacunación</li>
              <li>Chipeado</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Horarios</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Lunes - Viernes: 10:00 - 20:00</li>
              <li>Sábado: 9:00 - 13:00 y 16:00 - 20:00</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Visitanos</h3>
            <div className="">
              <iframe title="Ubicación" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3335.3966766235076!2d-66.31908522355833!3d-33.282283873456656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43eb8e2b13c53%3A0x426e683d243e1f65!2sVeterinaria%20del%20Parque!5e0!3m2!1ses-419!2sar!4v1716296334709!5m2!1ses-419!2sar" width="90%" height="90%" style={{ border: "0" }}></iframe>
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
