import { useContext } from "react"
import { BoardFilterContext } from "./BoardFilterContext"

export function useBoardFilter() {
	const context = useContext(BoardFilterContext)
	if (!context) {
		throw new Error("useBoardFilter must be used within BoardFilterProvider")
	}
	return context
}
