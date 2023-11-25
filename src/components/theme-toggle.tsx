import {Moon, Sun} from 'react-feather';
import {themeChange} from 'theme-change';
import {useEffect, useState} from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'vymalo-light'
    );
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    const onChange = () => {
        setTheme(theme === 'vymalo-light' ? 'vymalo-dark' : 'vymalo-light')
    };

    return (
        <label className="swap swap-rotate text-primary">

            {/* this hidden checkbox controls the state */}
            <input
                type="checkbox"
                className="theme-controller hidden"
                checked={theme === 'vymalo-light'}
                onChange={onChange}
            />

            {/* sun icon */}
            <Sun data-set-theme="vymalo-light" className="swap-on fill-current"/>

            {/* moon icon */}
            <Moon data-set-theme="vymalo-dark" className="swap-off fill-current"/>

        </label>
    );
}