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
	const { ref } = useDraggable({ id })
	return (
		<Card.Root ref={ref} cursor="grab">
			<Card.Header asChild>{header}</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	)
}
