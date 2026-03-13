import { beforeEach, describe, expect, it } from "vitest"
import {
	buildStorage,
	getFromStorage,
	removeItemFromStorage,
	setInStorage,
} from "./storage"

describe("storage utils", () => {
	beforeEach(() => {
		localStorage.clear()
	})

	describe("getFromStorage", () => {
		it("should return empty array when storage is empty", () => {
			expect(getFromStorage("test-key")).toEqual([])
		})

		it("should return parsed items from localStorage", () => {
			const items = [{ id: 1, name: "item1" }]
			localStorage.setItem("test-key", JSON.stringify(items))
			expect(getFromStorage("test-key")).toEqual(items)
		})
	})

	describe("setInStorage", () => {
		it("should add a new item to storage", () => {
			setInStorage("test-key", { id: 1, name: "item1" })
			expect(getFromStorage("test-key")).toEqual([{ id: 1, name: "item1" }])
		})

		it("should update an existing item in storage", () => {
			setInStorage("test-key", { id: 1, name: "item1" })
			setInStorage("test-key", { id: 1, name: "item1-updated" })
			expect(getFromStorage("test-key")).toEqual([
				{ id: 1, name: "item1-updated" },
			])
		})
	})

	describe("removeItemFromStorage", () => {
		it("should remove item by id", () => {
			setInStorage("test-key", { id: 1 })
			setInStorage("test-key", { id: 2 })
			removeItemFromStorage("test-key", 1)
			expect(getFromStorage("test-key")).toEqual([{ id: 2 }])
		})

		it("should remove item by object", () => {
			setInStorage("test-key", { id: 1 })
			removeItemFromStorage("test-key", { id: 1 })
			expect(getFromStorage("test-key")).toEqual([])
		})
	})

	describe("buildStorage", () => {
		it("should return a storage object with expected methods", () => {
			const storage = buildStorage<{ id: number }>("test-key")
			expect(storage).toHaveProperty("get")
			expect(storage).toHaveProperty("set")
			expect(storage).toHaveProperty("remove")
			expect(storage).toHaveProperty("empty")
			expect(storage).toHaveProperty("getRaw")
		})

		it("should return raw string from storage", () => {
			const storage = buildStorage<{ id: number }>("test-key")
			localStorage.setItem("test-key", "raw-value")
			expect(storage.getRaw()).toBe("raw-value")
		})

		it("should empty storage", () => {
			const storage = buildStorage<{ id: number }>("test-key")
			storage.set({ id: 1 })
			storage.empty()
			expect(storage.get()).toEqual([])
			expect(localStorage.getItem("test-key")).toBeNull()
		})
	})
})
