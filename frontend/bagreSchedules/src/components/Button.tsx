type Props = React.ComponentProps<"button">

export function Button({ ...rest }: Props) {
    return (
        <button {...rest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Click Me
        </button>
    )
}