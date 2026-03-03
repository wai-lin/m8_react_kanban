import { useCallback, useMemo, useState } from "react"
import * as z4 from "zod/v4/core"

type FormStatus = "idle" | "pending" | "error" | "success"

export function useForm<
	S extends z4.$ZodObject,
	SOutput = z4.output<S>,
	SError = z4.$ZodFlattenedError<SOutput>,
>(schema: S) {
	const [status, setStatus] = useState<FormStatus>("idle")
	const [errors, setErrors] = useState<SError>()

	const isIdle = useMemo(() => status === "idle", [status])
	const isPending = useMemo(() => status === "pending", [status])
	const isError = useMemo(() => status === "error", [status])
	const isSuccess = useMemo(() => status === "success", [status])

	const errorOf = useCallback(
		(field: keyof SOutput) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const err = errors as any
			const msgs = (err?.fieldErrors?.[field] ?? []) as string[]
			return msgs
		},
		[errors],
	)

	const validate = (data: unknown) => {
		const parsed = z4.safeParse(schema, data)
		if (!parsed.success) {
			setErrors(z4.flattenError(parsed.error) as SError)
			setStatus("error")
			throw new Error("Validation failed.")
		}
		setErrors(undefined)
		return parsed.data as SOutput
	}

	const onSubmit = (
		callback: (data: SOutput) => void | Promise<void>,
		onError?: (error: unknown) => void | Promise<void>,
	) => {
		return (e: React.SubmitEvent) => {
			e.preventDefault()
			setStatus("pending")
			try {
				const formData = new FormData(e.target)
				const data = Object.fromEntries(formData)
				const validated = validate(data)
				if (validated) {
					callback(validated)
					setStatus("success")
				}
			} catch (err) {
				setStatus("error")
				onError?.(err)
			}
		}
	}

	return {
		status,
		isIdle,
		isPending,
		isError,
		isSuccess,
		errors,
		errorOf,
		validate,
		onSubmit,
	}
}
