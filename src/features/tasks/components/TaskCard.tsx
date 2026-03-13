import { Box, Card, Flex, Text } from "@chakra-ui/react"
import { useDraggable } from "@dnd-kit/react"
import { useAtomValue } from "jotai"
import { compactViewAtom } from "../../../state/atoms"

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
	const compactView = useAtomValue(compactViewAtom)
	return (
		<Card.Root ref={ref} opacity={isDragging ? 0.5 : 1} onClick={onClick}>
			{header ? (
				<Card.Header py={compactView ? "2" : "4"}>
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
			<Card.Body py={compactView ? "2" : "4"}>
				{typeof children === "string" ? (
					<Text fontSize={compactView ? "sm" : "md"}>{children}</Text>
				) : (
					children
				)}
			</Card.Body>
		</Card.Root>
	)
}
