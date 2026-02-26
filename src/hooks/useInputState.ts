import { useState } from "react"

export function useInputState<T>(initialValue: T) {
	const [value, setValue] = useState(initialValue)

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { type, checked, value: inputValue } = e.target as never
		setValue((type === "checkbox" ? checked : inputValue) as T)
	}

	return {
		value,
		setValue,
		onChange,
		bind: { value, onChange },
	}
}
