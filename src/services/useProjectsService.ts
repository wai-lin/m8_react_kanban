import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createProject,
	deleteProject,
	fetchProjects,
	updateProject,
} from "../api/projects"

const projectsKey = ["projects"]

export function useProjectsQuery() {
	return useQuery({
		queryKey: projectsKey,
		queryFn: fetchProjects,
	})
}

export function useCreateProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createProject,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKey }),
	})
}

export function useUpdateProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: number
			input: { title?: string; description?: string }
		}) => updateProject(id, input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKey }),
	})
}

export function useDeleteProject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteProject,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: projectsKey }),
	})
}
