import { Box, Card, Flex } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/react"

export interface TaskCardProps {
	id: number
	header?: React.ReactNode
	handle?: React.ReactNode
	onClick?: () => void
}

export function TaskCard({
	id,
	header,
	handle,
	onClick,
	children,
}: React.PropsWithChildren<TaskCardProps>) {
	const { ref, isDragging, handleRef } = useDraggable({
		id: String(id),
	})
	return (
		<Card.Root ref={ref} opacity={isDragging ? 0.5 : 1} onClick={onClick}>
			{header ? (
				<Card.Header>
					<Flex align="center" justify="space-between" gap="3">
						<Box>{header}</Box>
						{handle ? (
							<Box
								ref={handleRef}
								cursor="grab"
								onClick={(event) => event.stopPropagation()}
							>
								{handle}
							</Box>
						) : null}
					</Flex>
				</Card.Header>
			) : null}
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	)
}
