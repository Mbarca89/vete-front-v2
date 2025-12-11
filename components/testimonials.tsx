import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Laura Fernández",
    pet: "Max (Golden Retriever)",
    text: "Excelente atención y profesionalismo. La Dra. González salvó la vida de Max cuando tuvo una emergencia. Eternamente agradecida.",
    rating: 5,
  },
  {
    name: "Roberto Silva",
    pet: "Luna (Gato Persa)",
    text: "El mejor lugar para llevar a tu mascota. Siempre atentos, cariñosos y muy profesionales. Luna está feliz y saludable gracias a ellos.",
    rating: 5,
  },
  {
    name: "Patricia Gómez",
    pet: "Toby (Beagle)",
    text: "Llevamos a Toby desde cachorro. El equipo es maravilloso, siempre disponibles y con precios justos. Los recomiendo 100%.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-card-foreground/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-card-foreground/60">{testimonial.pet}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
