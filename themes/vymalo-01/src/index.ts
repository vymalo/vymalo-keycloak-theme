import "./css/style.scss";
import "./libs/theme";
import sidepaneHtml from "./templates/sidepan.html";
import vymaloLogo from "./templates/logo.html";

function start() {
    document.body.insertAdjacentHTML("afterbegin", sidepaneHtml);

    const kcHeader = document.getElementById("kc-page-title");
    kcHeader?.insertAdjacentHTML("beforebegin", vymaloLogo);

    replaceLoginPage();
    replaceCheckbox();
    replaceInput();
    replaceOr();
}

const newCheckboxHTML = (name: string | undefined, input: HTMLInputElement | null) => `
<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">${name}</span>
    ${input?.outerHTML}
  </label>
</div>
`;

const newInputHtml = (idx: number, label: string, input: Element, error: string | undefined, complement = "") =>
    `
<label style="order: ${idx}" class="form-control w-full ${error ? "input-has-error" : ""}">
  <div class="label">
    <span class="label-text ${error ? "text-error" : ""}">${label}</span>
  </div>
  ${input.outerHTML}
  <div class="label">
    <span class="label-text-alt text-error">${error ?? ""}</span>
  </div>
</label>
${complement}
`.trim();

function replaceLoginPage() {
    const oldLogin = document.querySelector(".login-page");
    if (!oldLogin) return;
    const divWrapper = document.createElement("div");
    divWrapper.className = "login-page-wrapper";
    const divWrapperWrapper = document.createElement("div");
    divWrapperWrapper.innerHTML = oldLogin.outerHTML;
    divWrapperWrapper.className = "login-page-content";

    divWrapper.innerHTML = divWrapperWrapper.outerHTML;
    oldLogin.parentNode?.replaceChild(divWrapper, oldLogin);
}

function replaceCheckbox() {
    // Find the existing checkbox container
    document
        .querySelector(".login-page")
        ?.querySelectorAll(".checkbox")
        ?.forEach(oldCheckboxDiv => {
            if (oldCheckboxDiv) {
                const innerText = oldCheckboxDiv.querySelector("label")?.innerText?.trim();
                const input = oldCheckboxDiv.querySelector("input");
                oldCheckboxDiv.outerHTML = newCheckboxHTML(innerText, input);
            } else {
                console.error("Checkbox container not found!");
            }
        });
}

function replaceInput() {
    const inputBlocks = document.querySelector(".login-page")?.querySelectorAll(".app-fg");
    inputBlocks?.forEach((oldInputDiv, idx) => {
        if (oldInputDiv) {
            const label = oldInputDiv.querySelector("label")?.textContent?.trim();
            const input = oldInputDiv.querySelector('input[type="text"], input[type="password"], input[type="email"]');
            const error = oldInputDiv.querySelector(".old-text-message")?.textContent?.trim();
            const hiddenInput = oldInputDiv.querySelector('input[type="hidden"]')?.outerHTML;

            if (label && input) {
                oldInputDiv.outerHTML = newInputHtml(idx, label, input, error, hiddenInput);
            }
        } else {
            console.error("Input container not found!");
        }
    });
}

function replaceOr() {
    const kcSocialProvider = document.getElementById("kc-social-providers");
    if (!kcSocialProvider) return;

    const h2Msg = kcSocialProvider.querySelector("h2, h4") as HTMLElement;
    const orMsg = h2Msg.innerText?.trim();
    kcSocialProvider.insertAdjacentHTML("beforebegin", `<div class="divider">${orMsg}</div>`);
    kcSocialProvider!.querySelector("hr")?.remove();

    h2Msg.remove();
}

if (window) {
    window.addEventListener("load", start);

    window.addEventListener("load", async () => {
        await import("feather-icons").then(({ default: feather }) => {
            feather.replace();
        });
        console.log("Libs loaded");
    });
}
