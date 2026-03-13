import { createContext } from "react"

export interface BoardFilterState {
	searchTerm: string
	setSearchTerm: (value: string) => void
}

export const BoardFilterContext = createContext<BoardFilterState | null>(null)
