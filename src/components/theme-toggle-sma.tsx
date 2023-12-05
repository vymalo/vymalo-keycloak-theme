import {CloudSnow, Coffee, Sun} from "react-feather";
import {themeChange} from "theme-change";
import {useCallback, useEffect, useMemo, useState} from "react";

const defaultTheme = "sma-light";

const calculateNextTheme = (theme: string) => {
    if (theme === "sma-light") {
        return "sma-middle";
    }
    if (theme === "sma-middle") {
        return "sma-dark";
    }
    if (theme === "sma-dark") {
        return "sma-light";
    }
    return defaultTheme;
};

interface ThemeToggleVymaloProps {
}

export function ThemeToggleSma({}: ThemeToggleVymaloProps) {
    const [theme, setTheme] = useState(
        localStorage.getItem("sma-theme") ?? defaultTheme,
    );
    useEffect(() => {
        localStorage.setItem("sma-theme", theme);
    }, [theme]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        themeChange(false);
        // 👆 false parameter is required for react project
    }, []);

    const onChange = useCallback(() => {
        setTheme((prev) => calculateNextTheme(prev));
    }, []);

    const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

    return (
        <button className='btn btn-sm md:btn-md btn-ghost btn-circle text-primary' data-set-theme={nextTheme} onClick={onChange}>
            {/* sun icon */}
            {theme === "sma-light" && <Sun className="h-6 w-6"/>}

            {/* moon icon */}
            {theme === "sma-dark" && <Coffee className="h-6 w-6"/>}

            {/* middle icon */}
            {theme === "sma-middle" && <CloudSnow className="h-6 w-6"/>}
        </button>
    );
}
