import { render, screen } from "#src/testUtils.tsx"
import { describe, expect, it } from "vitest"
import { FormField } from "./FormField.tsx"

describe("FormField", () => {
	it("renders label and children", () => {
		render(
			<FormField label="Username">
				<input data-testid="input" />
			</FormField>,
		)

		expect(screen.getByText("Username")).toBeInTheDocument()
		expect(screen.getByTestId("input")).toBeInTheDocument()
	})

	it("renders error message", () => {
		render(
			<FormField label="Email" error="Invalid email">
				<input />
			</FormField>,
		)

		expect(screen.getByText("Invalid email")).toBeInTheDocument()
	})

	it("renders hint message", () => {
		render(
			<FormField label="Password" hint="At least 8 characters">
				<input />
			</FormField>,
		)

		expect(screen.getByText("At least 8 characters")).toBeInTheDocument()
	})
})
