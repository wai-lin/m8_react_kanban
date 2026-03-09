import { useModel } from "#hooks/useModel.ts"
import { useEffect } from "react"
import { storageKeys } from "../constants"
import type { Status } from "../types"

const defaults: Status[] = [
	{
		id: 1,
		title: "Todo",
		value: "todo",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		title: "InProgress",
		value: "in-progress",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 3,
		title: "Done",
		value: "done",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

export function useStatusModel() {
	const model = useModel<Status>(storageKeys.status)

	useEffect(() => {
		console.log(storageKeys.status, model.isEmpty)
		if (model.isEmpty) {
			defaults.forEach((df) => model.set(df))
		}
	}, [model])

	return model
}
