import { describe, expect, it } from "vitest"
import { slugify } from "./slugify"

describe("slugify", () => {
	it("should convert to lowercase", () => {
		expect(slugify("Hello World")).toBe("hello-world")
	})

	it("should replace spaces with dashes", () => {
		expect(slugify("test string here")).toBe("test-string-here")
	})

	it("should remove special characters", () => {
		expect(slugify("Hello @World!")).toBe("hello-world")
	})

	it("should handle multiple spaces and underscores", () => {
		expect(slugify("test   string__here")).toBe("test-string-here")
	})

	it("should trim start and end", () => {
		expect(slugify("  hello world  ")).toBe("hello-world")
	})

	it("should handle custom separator", () => {
		expect(slugify("Hello World", "_")).toBe("hello_world")
	})

	it("should remove leading and trailing dashes", () => {
		expect(slugify("--hello world--")).toBe("hello-world")
	})
})
