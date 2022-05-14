import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import PropTypes from "prop-types";
import { styled } from "@stitches/react";

type ButtonProps<T extends ElementType> = {
    renderAs?: T;
    disabled?: boolean;
    children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = "button">({
    children,
    ...rest
}: ButtonProps<T>): JSX.Element => {
    return (
        <StyledButton type="button" {...rest}>
            {children}
        </StyledButton>
    );
};

export default Button;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
};

const StyledButton = styled("button", {
    backgroundColor: "gainsboro",
    borderRadius: "9999px",
    fontSize: "13px",
    padding: "10px 15px",
    "&:hover": {
        backgroundColor: "lightgray",
    },
});
