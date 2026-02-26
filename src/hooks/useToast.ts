import { ToastContext } from "#contexts/ToastContext.tsx"
import { useContext } from "react"

export interface Toast {
	id: string
	message: string
	type?: "success" | "error" | "info"
	duration?: number
}

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error("useToast must be used within ToastProvider")
	}
	return context
}
