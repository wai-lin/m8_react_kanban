/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	base: process.env.NODE_ENV === "production" ? "/m8_react_kanban/" : "/",
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		css: false,
		setupFiles: "./src/setupTests.tsx",
	},
})
