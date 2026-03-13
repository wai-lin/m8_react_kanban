export interface ProjectRow {
	id: number
	title: string
	description: string | null
	slug: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface ProjectStatusRow {
	id: number
	project_id: number
	title: string
	value: string | null
	slug: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface TaskRow {
	id: number
	project_id: number
	status_id: number | null
	title: string
	description: string | null
	slug: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export interface ProjectStatus {
	id: number
	projectId: number
	title: string
	value: string
	slug: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export interface Project {
	id: number
	title: string
	slug: string
	description: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
}

export interface TaskStatusInfo {
	id: number
	title: string
	value: string
}

export interface Task {
	id: number
	projectId: number
	statusId: number | null
	title: string
	slug: string
	description: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	status: TaskStatusInfo | null
}
