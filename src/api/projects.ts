import { supabase } from "#src/lib/supabaseClient.ts"
import { slugify } from "#utils/slugify.ts"
import type { Project, ProjectRow } from "./types"

function mapProject(row: ProjectRow): Project {
	return {
		id: row.id,
		title: row.title,
		slug: slugify(row.title),
		description: row.description ?? "",
		createdAt: new Date(row.created_at),
		updatedAt: new Date(row.updated_at),
		deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
	}
}

export async function fetchProjects(): Promise<Project[]> {
	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.is("deleted_at", null)
		.order("created_at", { ascending: true })

	if (error) throw error
	return (data ?? []).map(mapProject)
}

export async function createProject(input: {
	title: string
	description?: string
}): Promise<Project> {
	const { data, error } = await supabase
		.from("projects")
		.insert({
			title: input.title,
			description: input.description ?? null,
		})
		.select("*")
		.single()

	if (error) throw error
	return mapProject(data)
}

export async function updateProject(
	id: number,
	input: { title?: string; description?: string },
): Promise<Project> {
	const { data, error } = await supabase
		.from("projects")
		.update({
			title: input.title,
			description: input.description ?? null,
			updated_at: new Date().toISOString(),
		})
		.eq("id", id)
		.select("*")
		.single()

	if (error) throw error
	return mapProject(data)
}

export async function deleteProject(id: number): Promise<void> {
	const { error } = await supabase
		.from("projects")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)

	if (error) throw error
}
