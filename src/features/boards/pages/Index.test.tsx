import { render, screen } from "#src/testUtils.tsx"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, it } from "vitest"
import { Index } from "./Index"

describe("Boards Index page", () => {
	it("renders project not found message when project doesn't exist", () => {
		render(
			<MemoryRouter initialEntries={["/project/non-existent"]}>
				<Routes>
					<Route path="/project/:slug" element={<Index />} />
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText("Project doesn't exists")).toBeInTheDocument()
	})

	it("renders project tasks when project exists", () => {
		const project = { id: 1, title: "Test Project", slug: "test-project" }
		localStorage.setItem("kprojects", JSON.stringify([project]))

		render(
			<MemoryRouter initialEntries={["/project/test-project"]}>
				<Routes>
					<Route path="/project/:slug" element={<Index />} />
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText("Test Project - Tasks")).toBeInTheDocument()
		expect(screen.getByText("Todo")).toBeInTheDocument()
		expect(screen.getByText("InProgress")).toBeInTheDocument()
		expect(screen.getByText("Done")).toBeInTheDocument()
	})
})
