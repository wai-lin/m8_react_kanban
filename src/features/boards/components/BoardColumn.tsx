import { Icon, Stack } from "#components"
import { Children } from "react"

export interface BoardColumnProps {
	title: string
	iconColor?: string
	children?: React.ReactNode
}

export function BoardColumn({ title, iconColor, children }: BoardColumnProps) {
	const hasChildren = Children.count(children) > 0

	return (
		<Stack direction="column" gap="md" className="board-column">
			<Stack direction="row" gap="xs" align="center">
				<Icon
					name="check-circle-solid"
					style={{ color: iconColor, width: "1.2rem" }}
				/>
				<h3 className="board-column-title">{title}</h3>
			</Stack>
			<Stack
				direction="column"
				gap="md"
				className="board-column-content"
				style={{
					// @ts-expect-error: Ignore the error! This is just changing css variable value
					"--board-column-content-bg": hasChildren
						? "transparent"
						: "var(--gray-300)",
				}}
			>
				{children}
			</Stack>
		</Stack>
	)
}
