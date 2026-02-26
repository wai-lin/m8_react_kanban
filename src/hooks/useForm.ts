import { useState } from "react"
import * as z4 from "zod/v4/core"

export function useForm<
	S extends z4.$ZodObject,
	SOutput = z4.output<S>,
	SError = z4.$ZodFlattenedError<SOutput>,
>(schema: S) {
	const [errors, setErrors] = useState<SError>()

	const errorOf = (field: keyof SOutput) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const err = errors as any
		const msgs = (err?.fieldErrors?.[field] ?? []) as string[]
		return msgs
	}

	const validate = (data: unknown) => {
		const parsed = z4.safeParse(schema, data)
		if (!parsed.success) {
			setErrors(z4.treeifyError(parsed.error) as SError)
			return null
		}
		setErrors(undefined)
		return parsed.data as SOutput
	}

	const onSubmit = (callback: (data: SOutput) => void | Promise<void>) => {
		return (e: React.SubmitEvent) => {
			e.preventDefault()
			const formData = new FormData(e.target)
			const data = Object.fromEntries(formData)
			const validated = validate(data)
			if (validated) callback(validated)
		}
	}

	return {
		errors,
		errorOf,
		validate,
		onSubmit,
	}
}
