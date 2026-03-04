import { TaskCard } from "#src/features/tasks/index.tsx"
import { Box, Container, Flex, Heading } from "@chakra-ui/react"
import { LuCircleDashed, LuCircleDot, LuCircleDotDashed } from "react-icons/lu"
import { BoardColumn } from "../components/BoardColumn"

export function Index() {
	return (
		<Container
			maxW="100%"
			padding="0"
			height="100vh"
			display="flex"
			flexDirection="column"
		>
			<Box paddingX="6" paddingY="4">
				<Heading size="lg">Tasks</Heading>
			</Box>

			<Flex gap="6" flex="1" paddingX="6" paddingBottom="6" overflowX="auto">
				<BoardColumn title="Todo" icon={<LuCircleDashed />}>
					<TaskCard header={<Heading size="md">Authentication Flow</Heading>} />
					<TaskCard header={<Heading size="md">Create dashboard</Heading>} />
				</BoardColumn>
				<BoardColumn title="InProgress" icon={<LuCircleDotDashed />}>
					<TaskCard
						header={<Heading size="md">Define user requirements</Heading>}
					/>
				</BoardColumn>
				<BoardColumn title="Done" icon={<LuCircleDot />}></BoardColumn>
			</Flex>
		</Container>
	)
}
