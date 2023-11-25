import React from "react"

type LogoProps = Omit<React.ComponentPropsWithoutRef<"img">, 'src' | 'srcSet'>

export function Logo(props: LogoProps) {
    return (
        <img
            {...props}
            alt={"Logo"}
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        />
    )
}