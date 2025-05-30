import themeToggle from "../templates/theme-toggle.html";

const mainThemes: MainTheme[] = ["vymalo-light-v2", "vymalo-dark-v2"];
const dataKey = "vaam-01-theme";

export function loadTheme(theme = normalizeTheme(localStorage.getItem(dataKey))) {
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
    
    
    return theme;
}

export function setTheme(theme: MainTheme = "vymalo-dark-v2") {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(dataKey, theme);
}

function normalizeTheme(theme: string | null | undefined) {
    return mainThemes.includes(theme as MainTheme) ? theme as MainTheme : "vymalo-dark-v2";
}

function addThemeToggle() {
    const headerWrapper = document.querySelector<HTMLDivElement>("#kc-header-wrapper");
    if (!headerWrapper) return;
    headerWrapper.insertAdjacentHTML("afterbegin", themeToggle);
}

window.addEventListener("load", async () => {
    const theme = loadTheme();
    addThemeToggle();
    
    const id = "kc-theme-play";
    const toggle = document.getElementById(id) as HTMLInputElement;
    toggle.checked = theme === 'vymalo-dark-v2';
    toggle.addEventListener('change', ev => {
        // @ts-ignore
        if (ev.target?.checked) {
            setTheme('vymalo-dark-v2')
        } else {
            setTheme('vymalo-light-v2')
        }
    })
    
    console.log("Theme loaded");
});