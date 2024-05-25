import {ThemeName} from "./theme-name";
import {ThemeToggleVymalo} from "./theme-toggle-vymalo";

interface ThemeToggleProps {
    themeName: string;
}

export function ThemeToggle({themeName}: ThemeToggleProps) {
    if (themeName === ThemeName.vymaloTheme) {
        return <ThemeToggleVymalo/>
    }

    return null;
}