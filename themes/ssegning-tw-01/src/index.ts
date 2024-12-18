import "./css/global.scss";
import "./libs/theme";

window.addEventListener("load", () => {
    const languageButton = document.querySelector("#kc-current-locale-link");
    addFeatherIconToButton(languageButton, "globe");

    replaceWrongCheckboxes();
    replaceWrongHr();
    replaceTitle();
});

window.addEventListener("load", async () => {
    await import("feather-icons").then(({ default: feather }) => {
        feather.replace();
    });
    console.log("Libs loaded");
});

function replaceWrongCheckboxes() {
    const wrongCheckBoxes = document.querySelectorAll("div.checkbox") as NodeListOf<HTMLElement>;
    for (const element of wrongCheckBoxes) {
        const checkBox = element.querySelector("input");
        if (!checkBox) continue;

        checkBox.classList.add("checkbox");

        const registerSpan = document.createElement("span");
        registerSpan.innerText = element.innerText.trim();
        registerSpan.classList.add("label-text", "ml-2");

        const label = document.createElement("label");
        label.classList.add("cursor-pointer", "label");
        label.appendChild(checkBox);
        label.appendChild(registerSpan);

        if (element.parentNode) {
            element.parentNode.replaceChild(label, element);
        }
    }
}

function replaceWrongHr() {
    const socialProviders = document.querySelector("#kc-social-providers");
    if (!socialProviders) return;

    const wrongHr = socialProviders.querySelectorAll("hr");
    let replacement = socialProviders.querySelector("h2");
    replacement = replacement ?? socialProviders.querySelector("h4");

    if (!replacement) return;

    for (const element of wrongHr) {
        const divDivider = document.createElement("div");
        divDivider.innerText = replacement.innerText.trim();
        divDivider.classList.add("divider");

        if (element.parentNode) {
            element.parentNode.removeChild(replacement);
            element.parentNode.replaceChild(divDivider, element);
        }
    }
}

function replaceTitle() {
    const title = document.querySelector("#kc-page-title") as HTMLElement;
    if (!title) return;
    const newTitleContent = document.createElement("span");
    newTitleContent.classList.add("bg-clip-text", "text-transparent", "bg-gradient-to-r", "from-pink-500", "to-violet-500");
    newTitleContent.innerText = title.innerText.trim();
    title.innerHTML = "";
    title.appendChild(newTitleContent);
}

function addFeatherIconToButton(element: Element | null, iconStr: string) {
    const icon = createIcon(iconStr);
    if (!element) return;

    element.prepend(icon);
}

function createIcon(icon: string): HTMLElement {
    const languageIcon = document.createElement("i");
    const attr = document.createAttribute("data-feather");
    attr.value = icon;
    languageIcon.attributes.setNamedItem(attr);
    return languageIcon;
}
