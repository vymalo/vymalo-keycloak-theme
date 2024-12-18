import { fontFamily } from "tailwindcss/defaultTheme";
import preset from "@vymalo/ui-preset";
import { merge } from "lodash";

/** @type {import("tailwindcss").Config} */
export default merge({}, preset, {
    content: ["./src/**/*.{ts,js,html,scss,tsx,jsx}", "./data/*/theme.properties"],
    theme: {
        extend: {
            screens: {
                "2xsmall": "320px",
                xsmall: "512px",
                small: "1024px",
                medium: "1280px",
                large: "1440px",
                xlarge: "1680px",
                "2xlarge": "1920px"
            },
            fontSize: {
                "3xl": "2rem"
            },
            fontFamily: {
                sans: ["Louis George Cafe", ...fontFamily.sans],
                serif: ["Louis George Cafe", ...fontFamily.serif],
                mono: ["Louis George Cafe", ...fontFamily.mono]
            }
        }
    }
});
