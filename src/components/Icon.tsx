export interface IconProps {
	ref?: React.Ref<HTMLElement>
	name: string
	className?: string
	style?: React.CSSProperties
}

export function Icon({ ref, name, className, style }: IconProps) {
	return (
		<i
			ref={ref}
			className={`icon mynaui--${name} ${className}`}
			style={style}
		/>
	)
}
