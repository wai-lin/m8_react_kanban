import { supabase } from "#src/shared/lib/supabaseClient.ts"
import { slugify } from "#src/shared/utils/slugify.ts"
import type { ProjectStatus, ProjectStatusRow } from "./types"

function mapStatus(row: ProjectStatusRow): ProjectStatus {
	return {
		id: row.id,
		projectId: row.project_id,
		title: row.title,
		value: row.value ?? "",
		slug: row.slug,
		createdAt: new Date(row.created_at),
		updatedAt: new Date(row.updated_at),
		deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
	}
}

export async function fetchProjectStatuses(
	projectId: number,
): Promise<ProjectStatus[]> {
	const { data, error } = await supabase
		.from("project_statuses")
		.select("*")
		.eq("project_id", projectId)
		.is("deleted_at", null)
		.order("created_at", { ascending: true })

	if (error) throw error
	return (data ?? []).map(mapStatus)
}

export async function createProjectStatus(input: {
	projectId: number
	title: string
	value?: string
}): Promise<ProjectStatus> {
	const { data, error } = await supabase
		.from("project_statuses")
		.insert({
			project_id: input.projectId,
			title: input.title,
			value: input.value ?? null,
			slug: input.value ?? slugify(input.title),
		})
		.select("*")
		.single()

	if (error) throw error
	return mapStatus(data)
}

export async function updateProjectStatus(
	id: number,
	input: { title?: string; value?: string },
): Promise<ProjectStatus> {
	const updatePayload: {
		title?: string
		value?: string | null
		slug?: string
		updated_at: string
	} = {
		updated_at: new Date().toISOString(),
	}

	if (input.title !== undefined) {
		updatePayload.title = input.title
		updatePayload.slug = slugify(input.title)
	}

	if (input.value !== undefined) {
		updatePayload.value = input.value
		updatePayload.slug = input.value ?? updatePayload.slug
	}

	const { data, error } = await supabase
		.from("project_statuses")
		.update(updatePayload)
		.eq("id", id)
		.select("*")
		.single()

	if (error) throw error
	return mapStatus(data)
}

export async function deleteProjectStatus(id: number): Promise<void> {
	const { error } = await supabase
		.from("project_statuses")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)

	if (error) throw error
}
