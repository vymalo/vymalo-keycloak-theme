import {clsx} from "keycloakify/tools/clsx";
import React from "react";

export type CheckboxProps<T extends React.ElementType> = {
    label?: React.ReactNode;
    as?: T;
    variant?: "primary" | "secondary";
} & React.ComponentPropsWithoutRef<T>;

export function Checkbox<T extends React.ElementType>({label, as, className, variant, ...props}: CheckboxProps<T>) {
    const Component = as || "input";

    return (
        <div className="form-control">
            <label className='label cursor-pointer'>
                {label && (
                    <span className='label-text'>
                        {label}
                    </span>
                )}
                <Component
                    {...props}
                    className={clsx(className, `checkbox`, {
                        "checkbox-primary": variant === "primary",
                        "checkbox-secondary": variant === "secondary",
                    })}
                />
            </label>
        </div>
    );

}