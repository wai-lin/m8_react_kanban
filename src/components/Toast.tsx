import { ToastContext } from "#contexts/ToastContext.tsx"
import { useToast, type Toast } from "#hooks/useToast.ts"
import { useRef, useState } from "react"

interface ToastProps {
	toast: Toast
	onRemove: (id: string) => void
}

function Toast({ toast, onRemove }: ToastProps) {
	return (
		<div
			role="status"
			aria-live="polite"
			className="toast"
			style={
				{
					"--toast-bg": `var(--color-${toast.type || "info"})`,
				} as React.CSSProperties
			}
		>
			<p>{toast.message}</p>
			<button onClick={() => onRemove(toast.id)}>×</button>
		</div>
	)
}

export function ToastsContainer() {
	const { toasts, remove } = useToast()

	return (
		<div className="toasts-container">
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} onRemove={remove} />
			))}
		</div>
	)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([])
	const newId = useRef(() => Date.now().toString())

	const add = (message: string, options?: Omit<Toast, "id" | "message">) => {
		const id = newId.current()
		const toast: Toast = {
			id,
			message,
			type: options?.type ?? "info",
			duration: options?.duration ?? 3000,
		}

		setToasts((prev) => [...prev, toast])

		if (toast.duration) {
			setTimeout(() => remove(id), toast.duration)
		}
	}

	const remove = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}

	return (
		<ToastContext.Provider value={{ toasts, add, remove }}>
			{children}
		</ToastContext.Provider>
	)
}
