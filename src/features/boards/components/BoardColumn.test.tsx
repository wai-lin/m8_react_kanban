import { render, screen } from "#src/testUtils.tsx"
import { DragDropProvider } from "@dnd-kit/react"
import { describe, expect, it } from "vitest"
import { BoardColumn } from "./BoardColumn"

describe("BoardColumn", () => {
	it("renders title and children", () => {
		render(
			<DragDropProvider>
				<BoardColumn dropId="todo" title="Todo Column">
					<div>Task 1</div>
				</BoardColumn>
			</DragDropProvider>,
		)

		expect(screen.getByText("Todo Column")).toBeTruthy()
		expect(screen.getByText("Task 1")).toBeTruthy()
	})
})
