import React from "react";
import { clsx } from "keycloakify/tools/clsx";

export type ButtonProps<T extends React.ElementType> = {
    isLoading?: boolean;
    as?: T;
    variant?: "primary" | "secondary" | 'ghost';
    isCircle?: boolean;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export function Button<T extends React.ElementType>({ as, className, variant, isCircle, isLoading, size, fullWidth, ...props }: ButtonProps<T>) {
    const Component = as || "button";
    return <Component {...props} className={clsx(className, `btn`, {
        "btn-primary text-base-100": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-ghost": variant === "ghost",
        "btn-circle": isCircle,
        "btn-sm": size === "sm",
        "btn-md": size === "md",
        "btn-lg": size === "lg",
        "btn-block": fullWidth,
    })} />;
}