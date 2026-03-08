import { render, screen } from "#src/testUtils.tsx"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { Index } from "./Index"

describe("Projects page", () => {
	it("render the page", () => {
		render(
			<MemoryRouter>
				<Index />
			</MemoryRouter>,
		)

		expect(screen.getByRole("heading")).toHaveTextContent("Projects")
		expect(screen.getByText("There's no project yet...")).toBeTruthy()
	})
})
