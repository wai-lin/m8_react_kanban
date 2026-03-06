import { Flex, Heading, Stack } from "@chakra-ui/react"
import { useDroppable } from "@dnd-kit/react"
import { Children } from "react"

export interface BoardColumnProps {
	dropId: string
	title: string
	icon?: React.ReactNode
	children?: React.ReactNode
}

export function BoardColumn({
	dropId,
	title,
	icon,
	children,
}: BoardColumnProps) {
	const hasChildren = Children.count(children) > 0

	const { ref } = useDroppable({ id: dropId })

	return (
		<Stack
			gap="4"
			py="4"
			px="2"
			w="300px"
			h="100%"
			rounded="sm"
			shadow="sm"
			bgColor="gray.100"
		>
			<Flex gap="1" align="center" flexShrink={0}>
				{icon}
				<Heading size="lg">{title}</Heading>
			</Flex>

			<Stack
				ref={ref}
				gap="2"
				bgColor={hasChildren ? "" : "gray.200"}
				flex="1"
				overflowY="auto"
				rounded="sm"
			>
				{children}
			</Stack>
		</Stack>
	)
}
