import { Stack } from "#components"

export interface BoardColumnProps {
	title: string
	children?: React.ReactNode
}

export function BoardColumn({ title, children }: BoardColumnProps) {
	return (
		<Stack direction="column" gap="md" className="board-column">
			<h3 className="board-column-title">{title}</h3>
			<Stack direction="column" gap="md" className="board-column-content">
				{children}
			</Stack>
		</Stack>
	)
}
