import React from "react";

export type TextInputProps<T extends React.ElementType> = {
    as?: T;
    variant?: "primary" | "secondary";
    label?: React.ReactNode;
    error?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function TextInput<T extends React.ElementType = 'input'>({
                                                                     children,
                                                                     label,
                                                                     error,
                                                                     as,
                                                                     ...props
                                                                 }: TextInputProps<T>) {
    const Component = as || "input";
    return (
        <div className="form-control w-full mb-2">
            {label && (
                <label className="label" htmlFor={props.id}>
                    <span className="label-text">{label}</span>
                </label>
            )}
            <Component
                {...props}
                className="input input-bordered w-full input-primary input-bg"
            />
            {error && (
                <label className="label">
                    <span className="label-text-alt">{error}</span>
                </label>
            )}
        </div>
    );
}
