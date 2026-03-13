import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import { AppLayout } from "./features/app_layouts"
import { projectPages } from "./features/projects"

const router = createBrowserRouter(
	[
		{
			element: <AppLayout />,
			children: [
				{ index: true, Component: projectPages.Index },
				{
					path: "/:projectId",
					lazy: async () => {
						const { boardsPages } = await import("./features/boards")
						return { Component: boardsPages.Index }
					},
					children: [
						{
							path: ":taskId",
							lazy: async () => {
								const { tasksPages } = await import("./features/tasks")
								return { Component: tasksPages.TaskDetail }
							},
						},
					],
				},
			],
		},
	],
	{
		basename: import.meta.env.BASE_URL,
	},
)

export function App() {
	return <RouterProvider router={router} />
}
