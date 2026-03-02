import { Route, Routes } from "react-router"
import { projectPages } from "./features/projects"

export function App() {
	return (
		<Routes>
			<Route path="/" element={<projectPages.Index />} />
		</Routes>
	)
}
