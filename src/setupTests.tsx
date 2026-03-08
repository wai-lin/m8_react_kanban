import "@testing-library/jest-dom"
import "@testing-library/jest-dom/vitest"
import ResizeObserver from "resize-observer-polyfill"
import { beforeEach, vi } from "vitest"
import "vitest-axe/extend-expect"

// Ensure proper DOM structure for React and Chakra UI
if (!document.documentElement.querySelector("#root")) {
	const root = document.createElement("div")
	root.id = "root"
	document.body.appendChild(root)
}

// Mock document.documentMode for React compatibility
Object.defineProperty(document, "documentMode", {
	value: 11,
	writable: true,
	configurable: true,
})

// Mock navigator.userAgent for React 19
Object.defineProperty(navigator, "userAgent", {
	value: "Mozilla/5.0 (jsdom) like Firefox",
	writable: true,
	configurable: true,
})

// ResizeObserver mock
vi.stubGlobal("ResizeObserver", ResizeObserver)

// matchMedia mock
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
	disconnect: vi.fn(),
	observe: vi.fn(),
	takeRecords: vi.fn(),
	unobserve: vi.fn(),
}))
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}

// requestAnimationFrame mock
window.requestAnimationFrame = (cb: FrameRequestCallback) =>
	setTimeout(cb, 1000 / 60)

// URL object mock
window.URL.createObjectURL = () => "https://i.pravatar.cc/300"
window.URL.revokeObjectURL = () => {}

// localStorage mock
const localStorageMock = (function () {
	let store: Record<string, string> = {}
	return {
		getItem: (key: string) => store[key] || null,
		setItem: (key: string, value: string) => {
			store[key] = value.toString()
		},
		removeItem: (key: string) => {
			delete store[key]
		},
		clear: () => {
			store = {}
		},
		get length() {
			return Object.keys(store).length
		},
		key: (index: number) => {
			const keys = Object.keys(store)
			return keys[index] || null
		},
	}
})()

vi.stubGlobal("localStorage", localStorageMock)

beforeEach(() => {
	localStorage.clear()
	vi.clearAllMocks()
})
