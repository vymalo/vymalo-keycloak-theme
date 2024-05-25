import React, {useMemo} from "react"
import {ThemeName} from "./theme-name";

type LogoProps = Omit<React.ComponentPropsWithoutRef<"img">, 'src' | 'srcSet'> & {
    themeName: string;
}

export function Logo({themeName, ...rest}: LogoProps) {
    const url = useMemo(() => {
        if (themeName === ThemeName.vymaloTheme) {
            return 'https://s3.ssegning.me/vymalo/public/vymalo.svg';
        }

        throw new Error(`Unsupported theme name: ${themeName}`);
    }, [themeName]);
    return <img {...rest} alt={"Vymalo Logo"} src={url}/>;
}