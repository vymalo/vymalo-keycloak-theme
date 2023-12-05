import {ThemeName} from "./theme-name";
import {ThemeToggleVymalo} from "./theme-toggle-vymalo";
import {ThemeToggleSma} from "./theme-toggle-sma";

interface ThemeToggleProps {
    themeName: string;
}

export function ThemeToggle({themeName}: ThemeToggleProps) {
    if (themeName === ThemeName.vymaloTheme) {
        return <ThemeToggleVymalo/>
    }

    if (themeName === ThemeName.smaTheme) {
        return <ThemeToggleSma/>
    }

    return null;
}