import type { Toast } from "#hooks/useToast.ts"
import { createContext } from "react"

interface ToastContextType {
	toasts: Toast[]
	add: (message: string, options?: Omit<Toast, "id" | "message">) => void
	remove: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(
	undefined,
)
