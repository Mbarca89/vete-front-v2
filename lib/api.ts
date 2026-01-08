import type { ProductsPage } from "@/types/shop"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

function requireServerUrl() {
  if (!SERVER_URL) {
    throw new ApiError("Falta NEXT_PUBLIC_SERVER_URL en .env.local")
  }
}

async function readBodySafe(res: Response) {
  const text = await res.text().catch(() => "")
  try {
    return { text, json: text ? JSON.parse(text) : null }
  } catch {
    return { text, json: null }
  }
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  requireServerUrl()

  let res: Response
  try {
    res = await fetch(url, init)
  } catch (e: any) {
    // backend caído / dns / CORS / etc.
    throw new ApiError("No se pudo conectar con el servidor", { url })
  }

  const { text, json } = await readBodySafe(res)

  if (!res.ok) {
    const msg =
      (typeof json === "object" && json && ("message" in json || "error" in json)
        ? String((json as any).message ?? (json as any).error)
        : text) || `HTTP ${res.status}`

    throw new ApiError(msg.slice(0, 600), { status: res.status, url, body: text })
  }

  // si esperábamos JSON y no vino JSON
  if (json === null) {
    throw new ApiError("La API devolvió una respuesta inválida (no JSON)", { status: res.status, url, body: text })
  }

  return json as T
}


// Categories
export function getCategories(): Promise<string[]> {
  return fetchJson<string[]>(
    `${SERVER_URL}/api/v1/category/public/getCategoriesNamesForWeb`,
    { cache: "no-store" }
  )
}

export function getProducts({ page, size }: { page: number; size: number }): Promise<ProductsPage> {
  return fetchJson<ProductsPage>(
    `${SERVER_URL}/api/v1/products/public/getProductsPaginated?page=${page}&size=${size}`,
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
    `${SERVER_URL}/api/v1/products/public/getByCategoryForWeb?categoryName=${encodeURIComponent(category)}&page=${page}&size=${size}`,
    { cache: "no-store" }
  )
}

export function searchProducts(term: string): Promise<any[]> {
  return fetchJson<any[]>(
    `${SERVER_URL}/api/v1/products/public/searchProduct?searchTerm=${encodeURIComponent(term)}`,
    { cache: "no-store" }
  )
}


export function createCheckout(payload: any): Promise<{ initPoint: string }> {
  return fetchJson<{ initPoint: string }>(
    `${SERVER_URL}/api/v1/mercadopago/public/create-checkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  )
}


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


