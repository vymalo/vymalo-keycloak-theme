// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {assert} from "keycloakify/tools/assert";
import {clsx} from "keycloakify/tools/clsx";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";
import {AlertTriangle, Check, Globe, Info, XCircle} from 'react-feather';
import {Button} from "../components/button";
import {Logo} from "../components/logo";
import {ThemeToggle} from "../components/theme-toggle";

type TemplatePropsExtended = {} & TemplateProps<KcContext, I18n>;

export default function Template(props: TemplatePropsExtended) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children,
    } = props;

    const {getClassName} = useGetClassName({doUseDefaultCss, classes});

    const {msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;

    const {realm, locale, auth, url, message, isAppInitiatedAction, themeName} = kcContext;

    return (
        <div className='flex sm:min-h-full flex-1 flex-col justify-center sm:py-12 sm:px-6 lg:px-8'>
            <div className="hidden sm:block sm:mx-auto sm:w-full sm:max-w-md">
                <Logo themeName={themeName} className="mx-auto h-20 w-auto mb-4"/>

                {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                    displayRequiredFields ? (
                        <div className={getClassName("kcContentWrapperClass")}>
                            <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span>
                                    {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                <h1 id="kc-page-title">{headerNode}</h1>
                            </div>
                        </div>
                    ) : (
                        <h1 id="kc-page-title"
                            className="text-center text-2xl font-bold leading-9 tracking-tight">{headerNode}</h1>
                    )
                ) : displayRequiredFields ? (
                    <div className={getClassName("kcContentWrapperClass")}>
                        <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                        </div>
                        <div className="col-md-10">
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span
                                                className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {showUsernameNode}
                        <div className={getClassName("kcFormGroupClass")}>
                            <div id="kc-username">
                                <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl}>
                                    <div className="kc-login-tooltip">
                                        <i className={getClassName("kcResetFlowIcon")}></i>
                                        <span
                                            className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="sm:mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-base-100 px-6 py-6 sm:shadow sm:rounded-lg sm:px-12 sm:py-12">
                    <div>
                        <header className='flex flex-row content-center justify-between'>
                            <div className='flex flex-row gap-4'>
                                <Logo themeName={themeName} className="block sm:hidden h-[32px] w-auto"/>
                                <div
                                    id="kc-header-wrapper"
                                    className='justify-center flex flex-col app-title font-bold'
                                >
                                    {msg("loginTitleHtml", realm.displayNameHtml)}
                                </div>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <ThemeToggle themeName={themeName}/>

                                {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                                    <div id="kc-locale">
                                        <div id="kc-locale-wrapper">
                                            <div className="dropdown dropdown-left" id="kc-locale-dropdown">
                                                <Button
                                                    as='label'
                                                    tabIndex={0}
                                                    isCircle
                                                    isLoading
                                                    size='md'
                                                    variant='ghost'
                                                    id="kc-current-locale-link">
                                                    <Globe className='text-primary'/>
                                                </Button>
                                                <ul tabIndex={0}
                                                    className="p-2 shadow menu dropdown-content z-[1] i18n-background rounded-box w-52">
                                                    {locale.supported.map(({languageTag}) => (
                                                        <li id={`language-${languageTag}`} key={languageTag}
                                                            className="kc-dropdown-item">
                                                            <label className={clsx('cursor-pointer', {
                                                                'active': languageTag === currentLanguageTag,
                                                            })} onClick={() => changeLocale(languageTag)}>
                                                                {labelBySupportedLanguageTag[languageTag]}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </header>

                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                                {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                    <div role='alert' className={clsx("alert", `alert-${message.type}`)}>
                                        {message.type === "success" && <Check/>}
                                        {message.type === "warning" && <AlertTriangle/>}
                                        {message.type === "error" && <XCircle/>}
                                        {message.type === "info" && <Info/>}

                                        <span
                                            dangerouslySetInnerHTML={{
                                                "__html": message.summary
                                            }}
                                        />
                                    </div>
                                )}
                                {children}
                                {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                    <form
                                        id="kc-select-try-another-way-form"
                                        action={url.loginAction}
                                        method="post"
                                        className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                    >
                                        <div>
                                            <div className={getClassName("kcFormGroupClass")}>
                                                <input type="hidden" name="tryAnotherWay" value="on"/>
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a
                                                    href="#"
                                                    id="try-another-way"
                                                    onClick={() => {
                                                        document.forms["kc-select-try-another-way-form" as never].submit();
                                                        return false;
                                                    }}
                                                >
                                                    {msg("doTryAnotherWay")}
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {displayInfo && (
                <div id="kc-info" className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div id="kc-info-wrapper" className='text-center mt-3'>
                        {infoNode}
                    </div>
                </div>
            )}
        </div>
    );
}
