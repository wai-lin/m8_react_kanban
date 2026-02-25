import { Route, Routes } from "react-router"
import { Projects } from "./projects"

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Projects />} />
		</Routes>
	)
}
