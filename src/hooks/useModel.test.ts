import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import { useModel } from "./useModel"

describe("useModel", () => {
	beforeEach(() => {
		localStorage.clear()
	})

	it("should initialize with empty array", () => {
		const { result } = renderHook(() => useModel<{ id: number }>("test-key"))
		expect(result.current.items).toEqual([])
		expect(result.current.isEmpty).toBe(true)
	})

	it("should set and get items", () => {
		const { result } = renderHook(() =>
			useModel<{ id: number; name: string }>("test-key"),
		)

		act(() => {
			result.current.set({ id: 1, name: "Test Item" })
		})

		expect(result.current.items).toHaveLength(1)
		expect(result.current.get(1)).toEqual({ id: 1, name: "Test Item" })
		expect(result.current.isEmpty).toBe(false)
	})

	it("should generate a new id", () => {
		const { result } = renderHook(() => useModel<{ id: number }>("test-key"))

		expect(result.current.newId()).toBe(1)

		act(() => {
			result.current.set({ id: 1 })
		})

		expect(result.current.newId()).toBe(2)
	})

	it("should remove items by id or object", () => {
		const { result } = renderHook(() => useModel<{ id: number }>("test-key"))

		act(() => {
			result.current.set({ id: 1 })
			result.current.set({ id: 2 })
		})

		expect(result.current.items).toHaveLength(2)

		act(() => {
			result.current.remove(1)
		})
		expect(result.current.items).toHaveLength(1)
		expect(result.current.get(1)).toBeUndefined()

		act(() => {
			result.current.remove({ id: 2 })
		})
		expect(result.current.items).toHaveLength(0)
	})

	it("should empty the storage", () => {
		const { result } = renderHook(() => useModel<{ id: number }>("test-key"))

		act(() => {
			result.current.set({ id: 1 })
		})

		act(() => {
			result.current.empty()
		})

		expect(result.current.items).toEqual([])
		expect(localStorage.getItem("test-key")).toBeNull()
	})
})
