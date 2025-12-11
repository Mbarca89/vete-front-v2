import { Button } from "@/components/ui/button"
import { Phone, Calendar, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="pt-32 pb-20 bg-gradient-to-b from-card to-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 text-balance">
              Cuidado Profesional para tu Mejor Amigo
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              En Veterinaria del Parque, brindamos atención veterinaria de excelencia con más de 15 años de experiencia.
              Tu mascota merece el mejor cuidado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                Reservar Turno
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contactar
              </Button>
            </div>
            <div className="flex flex-col gap-3 text-foreground/70">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>+54 11 1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Av. del Libertador 1234, Buenos Aires</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/happy-vet-dog-cat.png"
                alt="Veterinaria con mascotas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
