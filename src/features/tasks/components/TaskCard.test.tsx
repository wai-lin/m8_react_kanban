import { render, screen } from "#src/testUtils.tsx"
import { DragDropProvider } from "@dnd-kit/react"
import { describe, expect, it } from "vitest"
import { TaskCard } from "./TaskCard"

describe("TaskCard", () => {
	it("renders title and description", () => {
		render(
			<DragDropProvider>
				<TaskCard id={1} header={<h3>Task Title</h3>}>
					Task Description
				</TaskCard>
			</DragDropProvider>,
		)

		expect(screen.getByText("Task Title")).toBeTruthy()
		expect(screen.getByText("Task Description")).toBeTruthy()
	})
})
