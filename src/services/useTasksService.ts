import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query"
import {
	createTask,
	deleteTask,
	fetchProjectTasks,
	updateTask,
} from "../api/tasks"

const tasksKey = (projectId: number) => ["projects", projectId, "tasks"]

export function useProjectTasksQuery(projectId: number) {
	return useSuspenseQuery({
		queryKey: tasksKey(projectId),
		queryFn: () => fetchProjectTasks(projectId),
	})
}

export function useCreateTask(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createTask,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) }),
	})
}

export function useUpdateTask(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: number
			input: { title?: string; description?: string; statusId?: number | null }
		}) => updateTask(id, input),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) }),
	})
}

export function useDeleteTask(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) }),
	})
}
