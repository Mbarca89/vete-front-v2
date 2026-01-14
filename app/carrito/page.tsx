"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useCart } from "@/components/cart/CartProvider"
import type { CustomerData } from "@/types/cart"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

type Field = "name" | "email" | "phone"
type Errors = Partial<Record<Field, string>>
type Touched = Partial<Record<Field, boolean>>

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function onlyDigits(s: string) {
    return s.replace(/\D/g, "")
}

function validate(customer: CustomerData): Errors {
    const errors: Errors = {}

    const name = customer.name.trim()
    const email = customer.email.trim()
    const phoneDigits = onlyDigits(customer.phone)

    if (!name) errors.name = "El nombre es obligatorio."
    if (!email) errors.email = "El email es obligatorio."
    else if (!isValidEmail(email)) errors.email = "El email no tiene un formato válido."

    if (!phoneDigits) errors.phone = "El teléfono es obligatorio."
    else if (phoneDigits.length !== 10) {
        errors.phone = "Debe tener exactamente 10 números (sin espacios ni guiones)."
    }

    return errors
}

function hasErrors(errors: Errors) {
    return Object.keys(errors).length > 0
}

export default function CarritoPage() {
    const { items, subtotal, setQuantity, removeItem, clear } = useCart()
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState<CustomerData>({
        name: "",
        email: "",
        phone: "",
        notes: "",
    })
    const [touched, setTouched] = useState<Touched>({})
    const [errors, setErrors] = useState<Errors>({})

    const markTouched = (field: Field) =>
        setTouched((p) => ({ ...p, [field]: true }))

    const showError = (field: Field) => !!touched[field] && !!errors[field]

    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const phoneRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setErrors(validate(customer))
    }, [customer])

    const canPay = useMemo(() => {
        if (items.length === 0) return false
        return !hasErrors(errors)
    }, [items.length, errors])

    async function handlePay() {
        const currentErrors = validate(customer)

        if (hasErrors(currentErrors)) {
            setErrors(currentErrors)
            setTouched({ name: true, email: true, phone: true })

            if (currentErrors.name) nameRef.current?.focus()
            else if (currentErrors.email) emailRef.current?.focus()
            else if (currentErrors.phone) phoneRef.current?.focus()

            toast.warning("Revisá los datos del formulario.")
            return
        }

        const normalizedCustomer: CustomerData = {
            ...customer,
            name: customer.name.trim(),
            email: customer.email.trim(),
            phone: onlyDigits(customer.phone),
        }

        if (!SERVER_URL) {
            toast.error("Falta configurar NEXT_PUBLIC_SERVER_URL en el .env.local")
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`${SERVER_URL}/api/v1/mercadopago/public/create-checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: normalizedCustomer,
                    items: items.map((it) => ({
                        id: it.id,
                        title: it.name,
                        quantity: it.quantity,
                        unitPrice: it.price,
                    })),
                }),
            })

            // Si el server responde pero con error
            if (!res.ok) {
                const text = await res.text().catch(() => "")
                const msg = text?.trim()
                    ? text.slice(0, 400)
                    : `Error del servidor (HTTP ${res.status})`

                throw new Error(msg)
            }

            // Respuesta OK
            const data = (await res.json().catch(() => null)) as { initPoint?: string } | null
            if (!data?.initPoint) {
                throw new Error("El backend no devolvió initPoint")
            }

            toast.success("Redirigiendo a Mercado Pago…")
            window.location.href = data.initPoint
        } catch (e: any) {
            // Errores típicos: backend apagado, DNS, CORS, etc.
            const raw = String(e?.message ?? e)

            let friendly = raw

            // Cuando el backend está caído, fetch suele tirar "Failed to fetch"
            if (/failed to fetch/i.test(raw)) {
                friendly =
                    "No se pudo conectar con el servidor. Verificá que el backend esté encendido y que la URL sea correcta."
            }

            toast.error("No se pudo iniciar el pago", {
                description: friendly,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-32">
            <main className="container mx-auto px-4 py-10">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Items */}
                    <div className="md:col-span-2 space-y-4">
                        <h1 className="text-3xl font-bold text-primary">Carrito</h1>

                        {items.length === 0 ? (
                            <p className="text-muted-foreground">Tu carrito está vacío.</p>
                        ) : (
                            items.map((it) => (
                                <Card key={it.id} className="bg-card">
                                    <CardContent className="p-4 flex gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                            {it.thumbnail ? (
                                                <Image
                                                    src={`data:image/jpeg;base64,${it.thumbnail}`}
                                                    alt={it.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold">{it.name}</p>
                                                    {it.categoryName ? (
                                                        <p className="text-sm text-muted-foreground">{it.categoryName}</p>
                                                    ) : null}
                                                    <p className="text-sm mt-1">
                                                        <span className="font-bold text-primary">${it.price}</span> c/u
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(it.id)}
                                                    className="text-muted-foreground hover:text-foreground"
                                                    aria-label="Eliminar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setQuantity(it.id, it.quantity - 1)}
                                                    disabled={it.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <div className="w-10 text-center font-medium">{it.quantity}</div>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setQuantity(it.id, it.quantity + 1)}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </Button>

                                                <div className="ml-auto font-semibold">
                                                    ${Number(it.price * it.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}

                        {items.length > 0 && (
                            <Button variant="outline" onClick={clear} className="mt-2">
                                Vaciar carrito
                            </Button>
                        )}
                    </div>

                    {/* Checkout */}
                    <div className="md:col-span-1">
                        <Card className="sticky top-24 bg-card">
                            <CardHeader>
                                <CardTitle>Checkout</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Nombre */}
                                <div className="space-y-1">
                                    <Input
                                        ref={nameRef}
                                        placeholder="Nombre y apellido"
                                        value={customer.name}
                                        onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                                        onBlur={() => markTouched("name")}
                                        className={showError("name") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    />
                                    {showError("name") ? (
                                        <p className="text-xs text-red-500">{errors.name}</p>
                                    ) : null}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <Input
                                        ref={emailRef}
                                        type="email"
                                        placeholder="Email"
                                        value={customer.email}
                                        onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                                        onBlur={() => markTouched("email")}
                                        className={showError("email") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    />
                                    {showError("email") ? (
                                        <p className="text-xs text-red-500">{errors.email}</p>
                                    ) : null}
                                </div>

                                {/* Teléfono */}
                                <div className="space-y-1">
                                    <Input
                                        ref={phoneRef}
                                        placeholder="Teléfono (+54)"
                                        inputMode="numeric"
                                        value={customer.phone}
                                        onChange={(e) => {
                                            const digits = onlyDigits(e.target.value).slice(0, 10)
                                            setCustomer((p) => ({ ...p, phone: digits }))
                                        }}
                                        onBlur={() => markTouched("phone")}
                                        className={showError("phone") ? "border-red-500 focus-visible:ring-red-500" : ""}
                                    />
                                    {showError("phone") ? (
                                        <p className="text-xs text-red-500">{errors.phone}</p>
                                    ) : null}
                                </div>
                                <div className="pt-3 border-t border-border flex items-center justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={handlePay}
                                    disabled={!canPay || loading}
                                >
                                    {loading ? "Redirigiendo..." : "Pagar con Mercado Pago"}
                                </Button>

                                <p className="text-xs text-muted-foreground">
                                    * Sin registro. El carrito se guarda en tu navegador.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
