export function slugify(str: string, sep: string = "-"): string {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, sep)
		.replace(/^-+|-+$/g, "")
}
