import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createTask,
	deleteTask,
	fetchProjectTasks,
	updateTask,
} from "../api/tasks"
import type { Task, TaskStatusInfo } from "../api/types"

const tasksKey = (projectId: number) => ["projects", projectId, "tasks"]

export function useProjectTasksQuery(projectId?: number) {
	return useQuery({
		queryKey: ["projects", projectId, "tasks"],
		queryFn: () => fetchProjectTasks(projectId as number),
		enabled: Number.isFinite(projectId),
	})
}

export function useCreateTask(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) })
		},
	})
}

export function useUpdateTask(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: number
			input: { title?: string; description?: string; statusId?: number | null }
			optimisticStatus?: TaskStatusInfo | null
		}) => updateTask(id, input),
		onMutate: async ({ id, input, optimisticStatus }) => {
			if (!projectId) return undefined
			await queryClient.cancelQueries({ queryKey: tasksKey(projectId) })
			const previous = queryClient.getQueryData<Task[]>(tasksKey(projectId))
			if (previous) {
				queryClient.setQueryData<Task[]>(
					tasksKey(projectId),
					previous.map((task) =>
						task.id === id
							? {
									...task,
									statusId: input.statusId ?? task.statusId,
									status: optimisticStatus ?? task.status,
								}
							: task,
					),
				)
			}
			return { previous }
		},
		onError: (_error, _vars, context) => {
			if (!projectId || !context?.previous) return
			queryClient.setQueryData(tasksKey(projectId), context.previous)
		},
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) })
		},
	})
}

export function useDeleteTask(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: tasksKey(projectId) })
		},
	})
}
