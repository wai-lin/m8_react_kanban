export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	direction?: "row" | "column"
	gap?: "xs" | "sm" | "md" | "lg" | "xl" | (string & {})
	justify?:
		| "start"
		| "center"
		| "end"
		| "between"
		| "around"
		| "evenly"
		| (string & {})
	align?: "start" | "center" | "end" | "stretch" | (string & {})
	wrap?: boolean
}

export function Stack({
	direction = "column",
	gap,
	justify,
	align,
	wrap,
	className,
	style,
	children,
	...rest
}: React.PropsWithChildren<StackProps>) {
	const gapValue = gap
		? gap.match(/^(xs|sm|md|lg|xl)$/)
			? `var(--gap-${gap})`
			: gap
		: undefined

	const justifyValue =
		justify === "between"
			? "space-between"
			: justify === "around"
				? "space-around"
				: justify === "evenly"
					? "space-evenly"
					: justify

	const alignValue =
		align === "start" ? "flex-start" : align === "end" ? "flex-end" : align

	const baseStyles: React.CSSProperties = {
		display: "flex",
		flexDirection: direction === "row" ? "row" : "column",
		...(gapValue && { gap: gapValue }),
		...(justifyValue && { justifyContent: justifyValue }),
		...(alignValue && { alignItems: alignValue }),
		...(wrap && { flexWrap: "wrap" }),
	}

	return (
		<div className={className} style={{ ...baseStyles, ...style }} {...rest}>
			{children}
		</div>
	)
}
