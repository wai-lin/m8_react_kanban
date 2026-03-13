import { supabase } from "#src/shared/lib/supabaseClient.ts"
import { slugify } from "#src/shared/utils/slugify.ts"
import type { Task, TaskRow, TaskStatusInfo } from "./types"

type TaskRowWithStatus = TaskRow & {
	project_statuses: TaskStatusInfo | null
}

function mapTask(row: TaskRowWithStatus): Task {
	return {
		id: row.id,
		projectId: row.project_id,
		statusId: row.status_id,
		title: row.title,
		slug: row.slug,
		description: row.description ?? "",
		createdAt: new Date(row.created_at),
		updatedAt: new Date(row.updated_at),
		deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
		status: row.project_statuses
			? {
					id: row.project_statuses.id,
					title: row.project_statuses.title,
					value: row.project_statuses.value,
				}
			: null,
	}
}

export async function fetchProjectTasks(projectId: number): Promise<Task[]> {
	const { data, error } = await supabase
		.from("tasks")
		.select(`*, project_statuses ( id, title, value )`)
		.eq("project_id", projectId)
		.is("deleted_at", null)
		.order("created_at", { ascending: true })

	if (error) throw error
	return (data ?? []).map(mapTask)
}

export async function createTask(input: {
	projectId: number
	statusId?: number | null
	title: string
	description?: string
}): Promise<Task> {
	const { data, error } = await supabase
		.from("tasks")
		.insert({
			project_id: input.projectId,
			status_id: input.statusId ?? null,
			title: input.title,
			slug: slugify(input.title),
			description: input.description ?? null,
		})
		.select("*, project_statuses ( id, title, value )")
		.single()

	if (error) throw error
	return mapTask(data)
}

export async function updateTask(
	id: number,
	input: { title?: string; description?: string; statusId?: number | null },
): Promise<Task> {
	const updatePayload: {
		title?: string
		description?: string | null
		status_id?: number | null
		slug?: string
		updated_at: string
	} = {
		updated_at: new Date().toISOString(),
	}

	if (input.title !== undefined) {
		updatePayload.title = input.title
		updatePayload.slug = slugify(input.title)
	}

	if (input.description !== undefined) {
		updatePayload.description = input.description ?? null
	}

	if (input.statusId !== undefined) {
		updatePayload.status_id = input.statusId
	}

	const { data, error } = await supabase
		.from("tasks")
		.update(updatePayload)
		.eq("id", id)
		.select("*, project_statuses ( id, title, value )")
		.single()

	if (error) throw error
	return mapTask(data)
}

export async function deleteTask(id: number): Promise<void> {
	const { error } = await supabase
		.from("tasks")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)

	if (error) throw error
}
