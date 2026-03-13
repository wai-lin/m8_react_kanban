import { useMemo, useState } from "react"
import { BoardFilterContext } from "./BoardFilterContext"

export function BoardFilterProvider({ children }: React.PropsWithChildren) {
	const [searchTerm, setSearchTerm] = useState("")

	const value = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm])

	return (
		<BoardFilterContext.Provider value={value}>
			{children}
		</BoardFilterContext.Provider>
	)
}
