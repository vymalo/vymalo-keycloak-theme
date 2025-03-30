import themeToggle from "../templates/theme-toggle.html";

const mainThemes: MainTheme[] = ["light", "dark"];
const dataKey = "vymalo-02-theme";

export function loadTheme(theme = normalizeTheme(localStorage.getItem(dataKey))) {
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
    
    
    return theme;
}

export function setTheme(theme: MainTheme = "dark") {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(dataKey, theme);
}

function normalizeTheme(theme: string | null | undefined) {
    return mainThemes.includes(theme as MainTheme) ? theme as MainTheme : "dark";
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
    toggle.checked = theme === 'dark';
    toggle.addEventListener('change', ev => {
        // @ts-ignore
        if (ev.target?.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    })
    
    console.log("Theme loaded");
});