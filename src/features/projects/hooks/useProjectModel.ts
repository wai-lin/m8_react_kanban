import { useModel } from "#hooks/useModel.ts"
import { storageKeys } from "../constants"
import type { Project } from "../types"

export const useProjectsModel = () => useModel<Project>(storageKeys.projects)
