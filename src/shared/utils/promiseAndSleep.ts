export function promiseAndSleep(
	cb?: () => void | Promise<void>,
	timeout: number = 500,
): Promise<void> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				cb?.()
				resolve()
			} catch (e) {
				reject(e)
			}
		}, timeout)
	})
}
