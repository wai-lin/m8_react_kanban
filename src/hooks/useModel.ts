import { buildStorage } from "#utils/storage.ts"
import { useMemo, useRef, useState } from "react"

export function useModel<T extends { id: number }>(key: string) {
	const storage = useRef(buildStorage<T>(key))
	const [items, setItems] = useState(() => storage.current.get())

	const isEmpty = useMemo(() => items.length <= 0, [items.length])

	function set(item: T) {
		storage.current.set(item)
		setItems(storage.current.get())
	}

	function remove(item: number | T) {
		storage.current.remove(item)
		setItems(storage.current.get())
	}

	function empty() {
		storage.current.empty()
		setItems([])
	}

	return { items, isEmpty, set, remove, empty }
}
