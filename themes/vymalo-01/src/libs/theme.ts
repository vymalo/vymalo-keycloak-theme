import themeToggle from '../templates/theme-toggle.html';

const mainThemes: MainTheme[] = ["vymalo-light", "vymalo-dark"];
const dataKey = "vymalo-01-theme";

export function loadTheme(theme = normalizeTheme(localStorage.getItem(dataKey))) {
    if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
    }
}

export function setTheme(theme: MainTheme = 'vymalo-dark') {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(dataKey, theme);
}

function normalizeTheme(theme?: string | null) {
    return mainThemes.includes(theme as MainTheme) ? theme as MainTheme : 'vymalo-dark';
}

function addThemeToggle() {
    const headerWrapper = document.querySelector<HTMLDivElement>('#kc-page-title');
    if (!headerWrapper) return;
    headerWrapper.insertAdjacentHTML('afterbegin', themeToggle);
}

window.addEventListener('load', async () => {
    loadTheme();
    addThemeToggle();
    window.setTheme = setTheme;
});