/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/**/*.{html,css}",
    ],
    theme: {
        extend: {},
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
                    "primary": "#00a49a",
                    "secondary": "#00d500",
                    "accent": "#ff5d6e",
                    "neutral": "#100e13",
                    "base-100": "#f3fbff",
                    "info": "#0082f7",
                    "success": "#4ad800",
                    "warning": "#f7a100",
                    "error": "#ff2100",
                },
            },
            {
                'vymalo-dark': {
                    "primary": "#00a49a",
                    "secondary": "#00d500",
                    "accent": "#ff5d6e",
                    "neutral": "#031405",
                    "base-100": "#00242c",
                    "info": "#0082f7",
                    "success": "#4ad800",
                    "warning": "#f7a100",
                    "error": "#ff2100",
                },
            },
        ]
    }
}