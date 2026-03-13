import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query"
import {
	createProjectStatus,
	deleteProjectStatus,
	fetchProjectStatuses,
	updateProjectStatus,
} from "../api/statuses"

const statusesKey = (projectId: number) => ["projects", projectId, "statuses"]

export function useProjectStatusesQuery(projectId: number) {
	return useSuspenseQuery({
		queryKey: statusesKey(projectId),
		queryFn: () => fetchProjectStatuses(projectId),
	})
}

export function useCreateProjectStatus(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createProjectStatus,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) }),
	})
}

export function useUpdateProjectStatus(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: number
			input: { title?: string; value?: string }
		}) => updateProjectStatus(id, input),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) }),
	})
}

export function useDeleteProjectStatus(projectId: number) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteProjectStatus,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: statusesKey(projectId) }),
	})
}
