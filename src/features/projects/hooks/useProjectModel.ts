import { useModel } from "#hooks/useModel.ts"
import { storageKey } from "../constants"
import type { Project } from "../types"

export const useProjectsModel = () => useModel<Project>(storageKey)
