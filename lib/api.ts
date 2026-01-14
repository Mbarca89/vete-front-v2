import type { ProductsPage } from "@/types/shop"

export class ApiError extends Error {
  status?: number
  url?: string
  body?: string
  constructor(message: string, opts?: { status?: number; url?: string; body?: string }) {
    super(message)
    this.name = "ApiError"
    this.status = opts?.status
    this.url = opts?.url
    this.body = opts?.body
  }
}

const PUBLIC_BASE = (process.env.NEXT_PUBLIC_SERVER_URL ?? "").replace(/\/+$/, "") 

const INTERNAL_ORIGIN = (process.env.INTERNAL_ORIGIN ?? "").replace(/\/+$/, "")

function isAbsolute(s: string) {
  return /^https?:\/\//i.test(s)
}

function buildUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`


  if (PUBLIC_BASE && isAbsolute(PUBLIC_BASE)) return `${PUBLIC_BASE}${p}`

  if (typeof window !== "undefined") return `${PUBLIC_BASE}${p}`

  if (!INTERNAL_ORIGIN) {
    throw new ApiError("Falta INTERNAL_ORIGIN (ej: http://127.0.0.1) para llamadas server-side")
  }
  return `${INTERNAL_ORIGIN}${p}`
}

async function readBodySafe(res: Response) {
  const text = await res.text().catch(() => "")
  try {
    return { text, json: text ? JSON.parse(text) : null }
  } catch {
    return { text, json: null }
  }
}

type FetchJsonOptions = RequestInit & { withAuth?: boolean }

async function fetchJson<T>(path: string, init: FetchJsonOptions = {}): Promise<T> {
  const url = buildUrl(path)
  const { withAuth = false, headers, ...rest } = init

  const h = new Headers(headers)
  h.set("Accept", "application/json")

  if (!h.has("Content-Type") && rest.body && !(rest.body instanceof FormData)) {
    h.set("Content-Type", "application/json")
  }

  // Token SOLO en browser y SOLO si withAuth=true
  if (withAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) h.set("Authorization", `Bearer ${token}`)
  }

  let res: Response
  try {
    res = await fetch(url, { ...rest, headers: h })
  } catch {
    throw new ApiError("No se pudo conectar con el servidor", { url })
  }

  // Redirect al home SOLO si era una llamada privada
  if (res.status === 403) {
    const body = await readBodySafe(res)
    const msg =
      (typeof body.json === "object" && body.json && ("message" in body.json || "error" in body.json)
        ? String((body.json as any).message ?? (body.json as any).error)
        : body.text) || "Forbidden"

    if (withAuth && typeof window !== "undefined") {
      localStorage.clear()
      window.location.href = "/"
    }
    throw new ApiError(msg.slice(0, 600), { status: 403, url, body: body.text })
  }

  const { text, json } = await readBodySafe(res)

  if (!res.ok) {
    const msg =
      (typeof json === "object" && json && ("message" in json || "error" in json)
        ? String((json as any).message ?? (json as any).error)
        : text) || `HTTP ${res.status}`

    throw new ApiError(msg.slice(0, 600), { status: res.status, url, body: text })
  }

  if (res.status !== 204 && json === null) {
    throw new ApiError("La API devolvió una respuesta inválida (no JSON)", { status: res.status, url, body: text })
  }

  return json as T
}

/* ====== ENDPOINTS: siempre con /api/v1 ====== */

export function getCategories(): Promise<string[]> {
  return fetchJson<string[]>("/api/v1/category/public/getCategoriesNamesForWeb", { cache: "no-store" })
}

export function getProducts({ page, size }: { page: number; size: number }): Promise<ProductsPage> {
  return fetchJson<ProductsPage>(`/api/v1/products/public/getProductsPaginated?page=${page}&size=${size}`, { cache: "no-store" })
}

export function getProductsByCategory({
  category, page, size,
}: { category: string; page: number; size: number }): Promise<ProductsPage> {
  return fetchJson<ProductsPage>(
    `/api/v1/products/public/getByCategoryForWeb?categoryName=${encodeURIComponent(category)}&page=${page}&size=${size}`,
    { cache: "no-store" }
  )
}

export function searchProducts(term: string): Promise<any[]> {
  return fetchJson<any[]>(
    `/api/v1/products/public/searchProduct?searchTerm=${encodeURIComponent(term)}`,
    { cache: "no-store" }
  )
}

export function createCheckout(payload: any): Promise<{ initPoint: string }> {
  return fetchJson<{ initPoint: string }>(
    "/api/v1/mercadopago/public/create-checkout",
    { method: "POST", body: JSON.stringify(payload) }
  )
}
