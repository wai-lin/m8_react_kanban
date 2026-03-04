import { Route, Routes } from "react-router"
import { boardsPages } from "./features/boards/"
import { projectPages } from "./features/projects"

export function App() {
	return (
		<Routes>
			<Route path="/" element={<projectPages.Index />} />
			<Route path="/prj/:id" element={<boardsPages.Index />} />
		</Routes>
	)
}
