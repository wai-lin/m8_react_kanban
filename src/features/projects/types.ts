import type z from "zod"
import type { projectSchema } from "./constants"

export type Project = z.output<typeof projectSchema>
