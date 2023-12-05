import themes from "daisyui/src/theming/themes";
import { fontFamily } from "tailwindcss/defaultTheme";

const coreSmaTheme = {
    "primary": "#00a49a",
    "secondary": "#00d500",
    "accent": "#ff2100",
    "neutral": "#031405",
    "info": "#0082f7",
    "success": "#4ad800",
    "warning": "#f7a100",
    "error": "#ff5d6e",
}

const coreVymaloTheme = {
    "primary": "#00a49a",
    "secondary": "#00d500",
    "accent": "#ff5d6e",
    "neutral": "#100e13",
    "info": "#0082f7",
    "success": "#4ad800",
    "warning": "#f7a100",
    "error": "#ff2100",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/**/*.{html,css}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Louis George Cafe", ...fontFamily.sans],
                serif: ["Louis George Cafe", ...fontFamily.serif],
                mono: ["Louis George Cafe", ...fontFamily.mono],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
        require("daisyui"),
    ],
    daisyui: {
        themes: [
            {
                'vymalo-light': {
                    ...themes.cmyk,
                    ...coreVymaloTheme,
                },
            },
            {
                'vymalo-dark': {
                    ...themes.dracula,
                    ...coreVymaloTheme,
                },
            },
            {
                "sma-light": {
                    ...themes.cmyk,
                    ...coreSmaTheme,
                },
            },
            {
                "sma-middle": {
                    ...themes.autumn,
                    ...coreSmaTheme,
                },
            },
            {
                "sma-dark": {
                    ...themes.luxury,
                    ...coreSmaTheme,
                },
            },
        ]
    }
}