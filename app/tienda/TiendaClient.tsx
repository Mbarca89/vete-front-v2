"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"
import { getProducts, getProductsByCategory, searchProducts } from "@/lib/api"
import type { Categories, ProductDto, ProductsPage } from "@/types/shop"
import { toast } from "sonner"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


type TiendaClientProps = {
    categories: Categories
    initialProducts: ProductsPage
    initialError?: string | null
}

export default function TiendaClient({ categories, initialProducts, initialError }: TiendaClientProps) {

    useEffect(() => {
        if (initialError) {
            toast.error("No se pudo cargar la tienda", { description: initialError })
        }
    }, [initialError])

    const [loading, setLoading] = useState(false)

    const { addItem } = useCart()

    // --- estado principal
    const [products, setProducts] = useState<ProductDto[]>(initialProducts?.data ?? [])
    const [totalCount, setTotalCount] = useState<number>(initialProducts?.totalCount ?? 0)

    // --- errores
    const [error, setError] = useState<string | null>(null)

    // --- filtros
    const [category, setCategory] = useState<string | null>(null)

    // input controlado + término "aplicado" (para botón buscar)
    const [searchInput, setSearchInput] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    // --- paginado (0-based para backend)
    const [page, setPage] = useState(1)
    const pageSize = 12

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(totalCount / pageSize))
    }, [totalCount])

    // lista de categorías ordenada (por si vienen mezcladas mayúsc/minúsc)
    const categoriesList = useMemo(() => {
        return (categories ?? []).slice().sort((a, b) => a.localeCompare(b, "es"))
    }, [categories])

    // --- carga de productos según filtros
    useEffect(() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            setError(null)

            try {
                // 🔎 Búsqueda (no paginada)
                if (searchTerm.trim()) {
                    const res = await searchProducts(searchTerm.trim())

                    if (cancelled) return
                    const list = Array.isArray(res) ? res : []
                    setProducts(list)
                    setTotalCount(list.length)
                    return
                }

                // 🏷️ Categoría (paginada)
                if (category) {
                    const res = await getProductsByCategory({
                        category,
                        page,
                        size: pageSize,
                    })

                    if (cancelled) return
                    setProducts(res?.data ?? [])
                    setTotalCount(res?.totalCount ?? 0)
                    return
                }

                // 📦 Default (paginado)
                const res = await getProducts({ page, size: pageSize })

                if (cancelled) return
                setProducts(res?.data ?? [])
                setTotalCount(res?.totalCount ?? 0)
            } catch (e: any) {
                if (cancelled) return

                const msg =
                    e?.name === "ApiError"
                        ? e.message
                        : /failed to fetch/i.test(String(e?.message ?? e))
                            ? "No se pudo conectar con el servidor. Verificá que el backend esté encendido y la URL sea correcta."
                            : "Ocurrió un error inesperado al cargar los productos."

                setError(msg)

                // Toast (no muy largo)
                toast.error("No se pudo cargar la tienda", {
                    description: msg.length > 180 ? msg.slice(0, 180) + "..." : msg,
                })

                // Fallback: dejar UI en estado “vacío” consistente
                setProducts([])
                setTotalCount(0)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [category, page, searchTerm])


    // --- handlers
    const applySearch = () => {
        setPage(1)
        setCategory(null) // opcional: si buscás, limpio categoría
        setSearchTerm(searchInput)
    }

    const clearSearch = () => {
        setSearchInput("")
        setSearchTerm("")
        setPage(1)
    }

    const selectCategory = (c: string) => {
        setPage(1)
        setSearchInput("")
        setSearchTerm("")
        setCategory((prev) => (prev === c ? null : c)) // toggle
    }

    const clearCategory = () => {
        setCategory(null)
        setPage(1)
    }

    const showPagination = !searchTerm.trim() // oculto paginado cuando estás buscando (search no está paginado)

    // paginado UI
    const canPrev = page > 1
    const canNext = page < totalPages

    const pageButtons = useMemo(() => {
        const visiblePages = 4
        const half = Math.floor(visiblePages / 2)

        let start = Math.max(1, page - half)
        let end = Math.min(totalPages, start + visiblePages - 1)
        start = Math.max(1, end - visiblePages + 1)

        const arr: number[] = []
        for (let p = start; p <= end; p++) arr.push(p)
        return arr
    }, [page, totalPages, showPagination])

    const Spinner = () => (
        <div className="flex items-center justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    )

    return (
        <section className="py-20 bg-background overflow-x-hidden">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="md:col-span-1 space-y-6 min-w-0">
                    {/* Search */}
                    <div className="space-y-2">
                        <div className="relative">
                            <Input
                                placeholder="Buscar producto..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") applySearch()
                                }}
                                className="pr-20"
                            />
                            {searchInput ? (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            ) : null}

                            <button
                                type="button"
                                onClick={applySearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                aria-label="Buscar"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>

                        {searchTerm ? (
                            <p className="text-xs text-muted-foreground">
                                Buscando: <span className="font-medium">{searchTerm}</span>
                            </p>
                        ) : null}
                    </div>

                    {/* Categories */}
                    {/* Categories - Mobile Accordion */}
                    <div className="md:hidden">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="categories" className="border border-border rounded-lg bg-card px-3">
                                <AccordionTrigger className="text-sm font-bold text-primary">
                                    Categorías {category ? `• ${category}` : ""}
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-muted-foreground">
                                            {categoriesList.length ? `${categoriesList.length} categorías` : "Sin categorías"}
                                        </span>
                                        {category ? (
                                            <Button variant="ghost" size="sm" onClick={clearCategory} className="h-7 px-2">
                                                Limpiar
                                            </Button>
                                        ) : null}
                                    </div>

                                    <div className="max-h-72 overflow-y-auto pr-1 space-y-2">
                                        {categoriesList.length > 0 ? (
                                            categoriesList.map((c) => {
                                                const active = c === category
                                                return (
                                                    <button
                                                        key={c}
                                                        onClick={() => selectCategory(c)}
                                                        className={[
                                                            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                            active
                                                                ? "bg-primary text-primary-foreground"
                                                                : "hover:bg-muted text-foreground",
                                                        ].join(" ")}
                                                    >
                                                        {c}
                                                    </button>
                                                )
                                            })
                                        ) : (
                                            <p className="text-sm text-muted-foreground">Sin categorías</p>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div className="hidden md:block bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-primary">Categorías</h3>
                            {category ? (
                                <Button variant="ghost" size="sm" onClick={clearCategory} className="h-7 px-2">
                                    Limpiar
                                </Button>
                            ) : null}
                        </div>

                        <div className="space-y-2">
                            {categoriesList.length > 0 ? (
                                categoriesList.map((c) => {
                                    const active = c === category
                                    return (
                                        <button
                                            key={c}
                                            onClick={() => selectCategory(c)}
                                            className={[
                                                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                                                active
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-muted text-foreground",
                                            ].join(" ")}
                                        >
                                            {c}
                                        </button>
                                    )
                                })
                            ) : (
                                <p className="text-sm text-muted-foreground">Sin categorías</p>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Products */}
                <div className="md:col-span-3 space-y-6 min-w-0">
                    <div className="flex items-center justify-between">
                        <p className="text-foreground/70">
                            Mostrando{" "}
                            <span className="font-bold text-primary">
                                {products?.length ?? 0}
                            </span>{" "}
                            productos
                            {totalCount ? (
                                <span className="text-foreground/50"> (total: {totalCount})</span>
                            ) : null}
                        </p>
                    </div>

                    {loading ? (
                        <Spinner />
                    ) : products?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <Card key={p.id} className="border-border hover:shadow-lg transition-shadow overflow-hidden bg-card">
                                    {/* Imagen más chica + contain (evita zoom) */}
                                    <div className="relative h-36 bg-muted">
                                        {p.thumbnail ? (
                                            <Image
                                                src={`data:image/jpeg;base64,${p.thumbnail}`}
                                                alt={p.name}
                                                fill
                                                className="object-contain p-3"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                Sin imagen
                                            </div>
                                        )}

                                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                                            {p.categoryName}
                                        </Badge>
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-foreground mb-2 line-clamp-2">{p.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xl font-bold text-primary">${p.price}</span>
                                            <Button
                                                onClick={() =>
                                                    addItem({
                                                        id: p.id,
                                                        name: p.name,
                                                        price: p.price,
                                                        thumbnail: p.thumbnail ?? null,
                                                        categoryName: p.categoryName ?? null,
                                                    })
                                                }
                                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                                            >
                                                Agregar
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-12">No hay productos</p>
                    )}

                    {/* Pagination */}
                    {showPagination && totalPages > 1 ? (
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <Button
                                variant="outline"
                                disabled={!canPrev}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Anterior
                            </Button>

                            {pageButtons.map((p) => (
                                <Button
                                    key={p}
                                    variant={p === page ? "default" : "outline"}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </Button>
                            ))}

                            <Button
                                variant="outline"
                                disabled={!canNext}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Siguiente
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}
