import { Card } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/react"

export interface TaskCardProps {
	id: number
	header?: React.ReactNode
}

export function TaskCard({
	id,
	header,
	children,
}: React.PropsWithChildren<TaskCardProps>) {
	const { ref, isDragging } = useDraggable({ id: String(id) })
	return (
		<Card.Root ref={ref} cursor="grab" opacity={isDragging ? 0.5 : 1}>
			<Card.Header>{header}</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	)
}
