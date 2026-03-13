import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createProjectStatus,
	deleteProjectStatus,
	fetchProjectStatuses,
	updateProjectStatus,
} from "../api/statuses"

const statusesKey = (projectId: number) => ["projects", projectId, "statuses"]

export function useProjectStatusesQuery(projectId?: number) {
	return useQuery({
		queryKey: ["projects", projectId, "statuses"],
		queryFn: () => fetchProjectStatuses(projectId as number),
		enabled: Number.isFinite(projectId),
	})
}

export function useCreateProjectStatus(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createProjectStatus,
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) })
		},
	})
}

export function useUpdateProjectStatus(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: number
			input: { title?: string; value?: string }
		}) => updateProjectStatus(id, input),
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) })
		},
	})
}

export function useDeleteProjectStatus(projectId?: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteProjectStatus,
		onSuccess: () => {
			if (!projectId) return
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) })
		},
	})
}
