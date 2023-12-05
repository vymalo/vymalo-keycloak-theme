import {Moon, Sun} from 'react-feather';
import {themeChange} from 'theme-change';
import {useCallback, useEffect, useMemo, useState} from "react";

const defaultTheme = "vymalo-light";

const calculateNextTheme = (theme: string) => {
    if (theme === 'vymalo-light') {
        return 'vymalo-dark';
    }
    if (theme === 'vymalo-dark') {
        return 'vymalo-light';
    }
    return defaultTheme;
}

interface ThemeToggleVymaloProps {
}

export function ThemeToggleVymalo({}: ThemeToggleVymaloProps) {
    const [theme, setTheme] = useState(
        localStorage.getItem('vymalo-theme') ?? defaultTheme
    );
    useEffect(() => {
        localStorage.setItem('vymalo-theme', theme);
    }, [theme]);

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    const onChange = useCallback(() => {
        setTheme((prev) => calculateNextTheme(prev));
    }, []);

    const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);
    console.log({nextTheme});

    return (
        <button className='btn btn-sm md:btn-md btn-ghost btn-circle text-primary' data-set-theme={nextTheme}
                onClick={onChange}>
            {/* sun icon */}
            {theme === "vymalo-light" && <Sun className="h-6 w-6"/>}

            {/* moon icon */}
            {theme === "vymalo-dark" && <Moon className="h-6 w-6"/>}
        </button>
    );
}