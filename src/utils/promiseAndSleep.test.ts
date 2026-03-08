import { describe, expect, it, vi } from "vitest"
import { promiseAndSleep } from "./promiseAndSleep"

describe("promiseAndSleep", () => {
	it("should resolve after the specified timeout", async () => {
		const start = Date.now()
		const timeout = 100
		await promiseAndSleep(undefined, timeout)
		const end = Date.now()

		// Allowing some buffer for execution time
		expect(end - start).toBeGreaterThanOrEqual(timeout - 10)
	})

	it("should call the callback", async () => {
		const cb = vi.fn()
		await promiseAndSleep(cb, 50)
		expect(cb).toHaveBeenCalled()
	})

	it("should reject if callback throws", async () => {
		const error = new Error("Test Error")
		const cb = () => {
			throw error
		}

		await expect(promiseAndSleep(cb, 50)).rejects.toThrow("Test Error")
	})

	it("should work with async callback", async () => {
		let value = 0
		const cb = async () => {
			value = 1
		}
		await promiseAndSleep(cb, 50)
		expect(value).toBe(1)
	})
})
