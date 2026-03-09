import { Card, Center, Container, Heading } from "@chakra-ui/react"
import { useMemo } from "react"
import { useNavigate, useParams } from "react-router"
import { useTasksModel } from "../hooks"

export function TaskDetail() {
	const navigate = useNavigate()
	const params = useParams()
	const tasksModel = useTasksModel()

	const task = useMemo(
		() => tasksModel.get(Number(params.taskId)),
		[params.taskId, tasksModel],
	)

	return (
		<Center
			position="absolute"
			zIndex="popover"
			bgColor="blackAlpha.600"
			inset="0"
			onClick={() => navigate(-1)}
		>
			<Card.Root asChild onClick={(ev) => ev.stopPropagation()}>
				<Container h="80vh">
					<Card.Header>
						<Heading size="xl">{task?.title}</Heading>
					</Card.Header>
					<Card.Body>{task?.description || "..."}</Card.Body>
				</Container>
			</Card.Root>
		</Center>
	)
}
