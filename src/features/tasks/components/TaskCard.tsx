import { Card } from "@chakra-ui/react"

export interface TaskCardProps {
	header?: React.ReactNode
}

export function TaskCard({
	header,
	children,
}: React.PropsWithChildren<TaskCardProps>) {
	return (
		<Card.Root>
			<Card.Header asChild>{header}</Card.Header>
			<Card.Body>{children}</Card.Body>
		</Card.Root>
	)
}
