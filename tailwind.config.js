import themes from "daisyui/src/theming/themes";
import {fontFamily} from "tailwindcss/defaultTheme";

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
            maxWidth: {
                '8xl': '100rem',
            },
            screens: {
                '2xsmall': '320px',
                xsmall: '512px',
                small: '1024px',
                medium: '1280px',
                large: '1440px',
                xlarge: '1680px',
                '2xlarge': '1920px',
            },
            fontSize: {
                '3xl': '2rem',
            },
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
                    ...themes.lemonade,
                    ...coreVymaloTheme,
                },
            },
            {
                'vymalo-dark': {
                    ...themes.luxury,
                    ...coreVymaloTheme,
                    "primary": "#fff",
                },
            },
        ]
    }
}