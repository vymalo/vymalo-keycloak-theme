import React from "react"

type LogoProps = Omit<React.ComponentPropsWithoutRef<"img">, 'src' | 'srcSet'>

export function Logo(props: LogoProps) {
    return (
        <img
            {...props}
            alt={"Vymalo Logo"}
            src="https://s3.ssegning.me/vymalo/public/vymalo-transparent.png"
        />
    )
}