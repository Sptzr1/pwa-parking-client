"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error("Error de aplicación:", error)

    // Si es un error de chunk, intentar recargar automáticamente
    if (error.message.includes("chunk") || error.message.includes("Failed to load")) {
      console.log("Error de chunk detectado, recargando en 3 segundos...")
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }, [error])

  const isChunkError = error.message.includes("chunk") || error.message.includes("Failed to load")

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl">{isChunkError ? "Error de Carga" : "Algo salió mal"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isChunkError ? (
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">
                Error cargando recursos de la aplicación. Esto suele ocurrir durante el desarrollo.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  🔄 Recargando automáticamente en unos segundos...
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">Ha ocurrido un error inesperado en la aplicación.</p>
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Ver detalles del error
                </summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">{error.message}</pre>
              </details>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1" disabled={isChunkError}>
              <RefreshCw className="mr-2 h-4 w-4" />
              {isChunkError ? "Recargando..." : "Reintentar"}
            </Button>

            <Button onClick={() => (window.location.href = "/")} variant="outline" className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Modo Desarrollo:</strong> Si este error persiste, prueba:
              </p>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                <li>
                  • Limpiar caché: <code>npm run dev:clean</code>
                </li>
                <li>
                  • Reiniciar servidor: <code>Ctrl+C</code> y <code>npm run dev</code>
                </li>
                <li>
                  • Reset completo: <code>npm run reset</code>
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
