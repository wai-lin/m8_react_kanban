export function getFromStorage<T>(key: string): T[] {
	const jsonStr = localStorage.getItem(key) ?? ""
	if (jsonStr.length <= 0) return []
	return JSON.parse(jsonStr)
}

export function setInStorage<T extends { id: number }>(
	key: string,
	item: T,
): void {
	const items = getFromStorage<T>(key)
	const itemIdx = items.findIndex((i) => i.id === item.id)

	if (itemIdx >= 0) items[itemIdx] = item
	else items.push(item)

	localStorage.setItem(key, JSON.stringify(items))
}

export function removeItemFromStorage<T extends { id: number }>(
	key: string,
	item: number | T,
): void {
	const items = getFromStorage<T>(key).filter((itm) => {
		if (typeof item === "number") return itm.id !== item
		else return itm.id !== item.id
	})
	localStorage.setItem(key, JSON.stringify(items))
}

export function buildStorage<T extends { id: number }>(key: string) {
	return {
		getRaw() {
			return localStorage.getItem(key) ?? ""
		},
		get() {
			return getFromStorage<T>(key)
		},
		set(i: T) {
			setInStorage(key, i)
		},
		remove(i: number | T) {
			removeItemFromStorage(key, i)
		},
		empty() {
			localStorage.removeItem(key)
		},
	}
}
