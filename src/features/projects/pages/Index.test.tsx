import { useProjectsQuery } from "#src/features/projects/services/useProjectsService.ts"
import { render, screen } from "#src/testUtils.tsx"
import { MemoryRouter } from "react-router"
import { describe, expect, it, vi } from "vitest"
import { Index } from "./Index"

vi.mock("#src/features/projects/services/useProjectsService.ts", () => ({
	useCreateProject: () => ({ mutateAsync: vi.fn() }),
	useProjectsQuery: vi.fn(),
}))

describe("Projects page", () => {
	it("render the page", () => {
		vi.mocked(useProjectsQuery).mockReturnValue({
			data: [],
		} as never)

		render(
			<MemoryRouter>
				<Index />
			</MemoryRouter>,
		)

		expect(screen.getByRole("heading")).toHaveTextContent("Projects")
		expect(screen.getByText("There's no project yet...")).toBeTruthy()
	})
})
