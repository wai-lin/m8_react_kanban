import { useState } from "react"
import * as z4 from "zod/v4/core"

export function useForm<
	S extends z4.$ZodObject,
	SOutput = z4.output<S>,
	SError = z4.$ZodErrorTree<S>,
>(schema: S, defaultState: SOutput) {
	const [state, setState] = useState<SOutput>(defaultState as SOutput)
	const [errors, setErrors] = useState<SError>()

	const parseState = () => {
		const parsed = z4.safeParse(schema, state)
		if (!parsed.success) setErrors(z4.treeifyError(parsed.error) as SError)
		return parsed.data
	}

	const setField = <K extends keyof SOutput>(field: K, value: SOutput[K]) => {
		setState((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, type, value, checked } = e.target as never
		const stateValue = type === "checkbox" ? checked : value

		setState((prev) => ({
			...prev,
			[name]: stateValue,
		}))
	}

	const handleOnSubmit = (callback: (data: SOutput) => void) => {
		return (e: React.SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()
			const parsed = parseState()
			if (parsed) callback(parsed as SOutput)
		}
	}

	return {
		state,
		errors,
		onSubmit: handleOnSubmit,
		onChange: handleOnChange,
		setState,
		setField,
	}
}
