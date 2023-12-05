import {useMemo, useState} from "react";
import {ThemeName} from "./theme-name";

export function useGlobalStylesheet(themeName: string) {
    const [styleLoaded, setStyleLoaded] = useState(false);
    useMemo(() => {
        switch (themeName) {
            case ThemeName.vymaloTheme:
                // @ts-expect-error
                import("./vymalo-theme.scss")
                    .then(() => {
                        setStyleLoaded(true);
                    })
                    .catch(err => console.error(err));
                break;
            case ThemeName.smaTheme:
                // @ts-expect-error
                import("./sma-theme.scss")
                    .then(() => {
                        setStyleLoaded(true);
                    })
                    .catch(err => console.error(err));
                break;
        }
    }, [themeName]);

    return styleLoaded;
}