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
            className={[
                "storybook-button",
                `storybook-button--${size}`,
                mode,
            ].join(" ")}
            {...props}
        >
            {label}
        </button>
    );
};
