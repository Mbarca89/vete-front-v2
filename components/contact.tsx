"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ""
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ""
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""

function requireEmailJsEnv() {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error(
      "Falta configurar EmailJS. Revisá NEXT_PUBLIC_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY en .env.local"
    )
  }
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.warning("Completá todos los campos para enviar el mensaje.")
      return
    }

    setLoading(true)

    try {
      requireEmailJsEnv()
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })

      toast.success("Mensaje enviado ✅", {
        description: "Te vamos a responder a la brevedad.",
      })

      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (err: any) {
      const msg = String(err?.text || err?.message || err || "Error desconocido")
      toast.error("No se pudo enviar el mensaje", {
        description: msg.slice(0, 300),
      })
      console.error("EmailJS error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contáctanos</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Estamos para ayudarte. Comunícate con nosotros para cualquier consulta
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-stretch">

          <Card className="border-border bg-background mb-6 h-full">
            <CardHeader>
              <CardTitle className="text-foreground">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Dirección</p>
                  <p className="text-foreground/70">Riobamba 2123 - San Luis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Teléfono</p>
                  <p className="text-foreground/70">+54 9 266 4392132</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-foreground/70">info@veterinariadelparque.com.ar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Horarios</p>
                  <p className="text-foreground/70">Lun - Vie: 9:00 - 20:00</p>
                  <p className="text-foreground/70">Sáb: 9:00 - 14:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-background h-full">
            <CardHeader>
              <CardTitle className="text-foreground">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div>
                  <Input
                    placeholder="Tu Nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Tu Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Tu Teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Tu Mensaje"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-auto">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
