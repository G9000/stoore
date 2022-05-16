interface ButtonProps {
    primary?: boolean;
    size?: "small" | "medium" | "large";
    label: string;
    onClick?: () => void;
}

export const Button = ({
    primary = true,
    size = "medium",
    label,
    ...props
}: ButtonProps) => {
    const mode = primary ? "bg-blue-500" : "bg-gray-500";
    return (
        <button
            type="button"
            className="bg-purple-200 py-4 px-2 text-red border rounded-full"
            {...props}
        >
            {label}
        </button>
    );
};
