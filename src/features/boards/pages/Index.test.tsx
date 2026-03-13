import { useProjectsQuery } from "#src/services/useProjectsService.ts"
import { useProjectStatusesQuery } from "#src/services/useStatusesService.ts"
import { useProjectTasksQuery } from "#src/services/useTasksService.ts"
import { render, screen } from "#src/testUtils.tsx"
import { MemoryRouter, Route, Routes } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Index } from "./Index"

vi.mock("#src/services/useProjectsService.ts", () => ({
	useProjectsQuery: vi.fn(),
}))

vi.mock("#src/services/useStatusesService.ts", () => ({
	useProjectStatusesQuery: vi.fn(),
	useCreateProjectStatus: () => ({ mutateAsync: vi.fn() }),
}))

vi.mock("#src/services/useTasksService.ts", () => ({
	useProjectTasksQuery: vi.fn(),
	useCreateTask: () => ({ mutateAsync: vi.fn() }),
	useUpdateTask: () => ({ mutate: vi.fn() }),
}))

describe("Boards Index page", () => {
	it("renders project not found message when project doesn't exist", () => {
		vi.mocked(useProjectsQuery).mockReturnValue({ data: [] } as never)
		render(
			<MemoryRouter initialEntries={["/project/1"]}>
				<Routes>
					<Route path="/project/:projectId" element={<Index />} />
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText("Project doesn't exists")).toBeInTheDocument()
	})

	it("renders project tasks when project exists", () => {
		const project = {
			id: 1,
			title: "Test Project",
			slug: "test-project",
		}
		vi.mocked(useProjectsQuery).mockReturnValue({ data: [project] } as never)
		vi.mocked(useProjectStatusesQuery).mockReturnValue({
			data: [
				{ id: 1, title: "Todo", value: "todo" },
				{ id: 2, title: "InProgress", value: "in-progress" },
				{ id: 3, title: "Done", value: "done" },
			],
		} as never)
		vi.mocked(useProjectTasksQuery).mockReturnValue({ data: [] } as never)

		render(
			<MemoryRouter initialEntries={["/project/1"]}>
				<Routes>
					<Route path="/project/:projectId" element={<Index />} />
				</Routes>
			</MemoryRouter>,
		)

		expect(screen.getByText("Test Project - Tasks")).toBeInTheDocument()
		expect(screen.getByText("Todo")).toBeInTheDocument()
		expect(screen.getByText("InProgress")).toBeInTheDocument()
		expect(screen.getByText("Done")).toBeInTheDocument()
	})
})
