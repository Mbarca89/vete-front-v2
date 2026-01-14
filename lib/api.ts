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

const SERVER_URL_RAW = process.env.NEXT_PUBLIC_SERVER_URL ?? ""
const SERVER_URL = SERVER_URL_RAW.replace(/\/+$/, "") // saca slash final

function requireServerUrl() {
  if (!SERVER_URL) {
    throw new ApiError("Falta NEXT_PUBLIC_SERVER_URL (.env.local / .env.production)")
  }
}

function buildUrl(path: string) {
  requireServerUrl()
  const p = path.startsWith("/") ? path : `/${path}`
  return `${SERVER_URL}${p}`
}

async function readBodySafe(res: Response) {
  const text = await res.text().catch(() => "")
  try {
    return { text, json: text ? JSON.parse(text) : null }
  } catch {
    return { text, json: null }
  }
}

type FetchJsonOptions = RequestInit & {
  withAuth?: boolean
}

async function fetchJson<T>(path: string, init: FetchJsonOptions = {}): Promise<T> {
  const url = buildUrl(path)

  const { withAuth = false, headers, ...rest } = init

  // armamos headers
  const h = new Headers(headers)
  h.set("Accept", "application/json")

  // Si mandamos body JSON, seteamos content-type (salvo FormData)
  if (!h.has("Content-Type") && rest.body && !(rest.body instanceof FormData)) {
    h.set("Content-Type", "application/json")
  }

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


  if (res.status === 403) {
    if (withAuth && typeof window !== "undefined") {
      localStorage.clear()
      window.location.href = "/"
    }
    const body = await readBodySafe(res)
    const msg =
      (typeof body.json === "object" && body.json && ("message" in body.json || "error" in body.json)
        ? String((body.json as any).message ?? (body.json as any).error)
        : body.text) || "Forbidden"
    throw new ApiError(msg.slice(0, 600), { status: 403, url, body: body.text })
  }

  const { text, json } = await readBodySafe(res)

  if (!res.ok) {
    const msg =
      (typeof json === "object" &&
        json &&
        ("message" in json || "error" in json)
        ? String((json as any).message ?? (json as any).error)
        : text) || `HTTP ${res.status}`

    throw new ApiError(msg.slice(0, 600), { status: res.status, url, body: text })
  }

  // Si esperábamos JSON y no vino JSON (y no es 204)
  if (res.status !== 204 && json === null) {
    throw new ApiError("La API devolvió una respuesta inválida (no JSON)", {
      status: res.status,
      url,
      body: text,
    })
  }

  return json as T
}


// export function getCategories(): Promise<string[]> {
//   return fetchJson<string[]>(
//     "/v1/category/public/getCategoriesNamesForWeb",
//     { cache: "no-store" }
//   )
// }

export async function getCategories(): Promise<string[]> {
  try {
    return await fetchJson<string[]>("/v1/category/public/getCategoriesNamesForWeb", { cache: "no-store" })
  } catch (e: any) {
    console.error("getCategories failed:", e?.message, e?.status, e?.url, e?.body)
    return []
  }
}


export function getProducts({ page, size }: { page: number; size: number }): Promise<ProductsPage> {
  return fetchJson<ProductsPage>(
    `/v1/products/public/getProductsPaginated?page=${page}&size=${size}`,
    { cache: "no-store" }
  )
}

export function getProductsByCategory({
  category,
  page,
  size,
}: {
  category: string
  page: number
  size: number
}): Promise<ProductsPage> {
  return fetchJson<ProductsPage>(
    `/v1/products/public/getByCategoryForWeb?categoryName=${encodeURIComponent(category)}&page=${page}&size=${size}`,
    { cache: "no-store" }
  )
}

export function searchProducts(term: string): Promise<any[]> {
  return fetchJson<any[]>(
    `/v1/products/public/searchProduct?searchTerm=${encodeURIComponent(term)}`,
    { cache: "no-store" }
  )
}

export function createCheckout(payload: any): Promise<{ initPoint: string }> {
  return fetchJson<{ initPoint: string }>(
    "/v1/mercadopago/public/create-checkout",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
}
