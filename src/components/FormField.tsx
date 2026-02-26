import { useId } from "react"

export interface FormFieldProps {
	label?: React.ReactNode
	hint?: string
	error?: string
	children?: (id: string) => React.ReactNode
}
export function FormField({ label, hint, error, children }: FormFieldProps) {
	const inputId = useId()
	const msg = error || hint
	const hasMsg = (msg?.length ?? 0) > 0
	const msgClass = (error?.length ?? 0) > 0 ? "error" : "hint"

	return (
		<div>
			<label htmlFor={inputId}>{label}</label>
			{children?.(inputId)}
			{hasMsg && <p className={msgClass}>{msg}</p>}
		</div>
	)
}
