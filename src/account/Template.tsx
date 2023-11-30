// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {clsx} from "keycloakify/tools/clsx";
import {type TemplateProps} from "keycloakify/account/TemplateProps";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";
import {assert} from "keycloakify/tools/assert";
import {Globe, LogOut, Menu} from "react-feather";
import {Logo} from "../components/logo";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {kcContext, i18n, active, children} = props;

    const {msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;

    const {locale, url, features, realm, message, referrer} = kcContext;

    return (
        <>
            <header className='absolute top-0 w-full z-10'>
                <nav className="navbar bg-base-200 sm:bg-base-100 px-6" role="navigation">
                    <label htmlFor="main-drawer" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                        <Menu className='text-primary'/>
                    </label>
                    <div className="flex-1">
                        <Logo className="h-7 w-auto"/>
                        <span className="text-xl ml-1">accounts</span>
                    </div>

                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                                <li>
                                    <div id="kc-locale-dropdown" className='dropdown dropdown-left'>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <label tabIndex={0} id="kc-current-locale-link">
                                            <Globe className='text-primary'/>
                                        </label>
                                        <ul tabIndex={0}
                                            className="p-2 shadow menu dropdown-content z-[1] i18n-background rounded-box w-52">
                                            {locale.supported.map(({languageTag}) => (
                                                <li key={languageTag}>
                                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                    <label
                                                        className={clsx('cursor-pointer', {
                                                            'active': languageTag === currentLanguageTag,
                                                        })}
                                                        onClick={() => changeLocale(languageTag)}>
                                                        {labelBySupportedLanguageTag[languageTag]}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            )}
                            {referrer?.url && (
                                <li>
                                    <a className='link link-primary' href={referrer.url} id="referrer">
                                        {msg("backTo", referrer.name)}
                                    </a>
                                </li>
                            )}
                            <li>
                                <a href={url.getLogoutUrl()}>
                                    <LogOut className='text-primary'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div id='account' className="drawer lg:drawer-open">
                <input id="main-drawer" type="checkbox" className="drawer-toggle"/>

                <div className="drawer-content px-6 pt-24">
                    {message !== undefined && (
                        <div className={clsx("alert", `alert-${message.type}`)}>
                            {message.type === "success" && <span className="pficon pficon-ok"></span>}
                            {message.type === "error" && <span className="pficon pficon-error-circle-o"></span>}
                            <span className="kc-feedback-text">{message.summary}</span>
                        </div>
                    )}

                    <div className='flex flex-col gap-4 max-w-lg'>
                        {children}
                    </div>
                </div>

                <div className="drawer-side pt-16">
                    <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li className={clsx(active === "account" && "active")}>
                            <a className={clsx(active === "account" && "active")}
                               href={url.accountUrl}>{msg("account")}</a>
                        </li>
                        {features.passwordUpdateSupported && (
                            <li className={clsx(active === "password" && "active")}>
                                <a className={clsx(active === "password" && "active")}
                                   href={url.passwordUrl}>{msg("password")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "totp" && "active")}>
                            <a className={clsx(active === "totp" && "active")}
                               href={url.totpUrl}>{msg("authenticator")}</a>
                        </li>
                        {features.identityFederation && (
                            <li className={clsx(active === "social" && "active")}>
                                <a className={clsx(active === "social" && "active")}
                                   href={url.socialUrl}>{msg("federatedIdentity")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "sessions" && "active")}>
                            <a className={clsx(active === "sessions" && "active")}
                               href={url.sessionsUrl}>{msg("sessions")}</a>
                        </li>
                        <li className={clsx(active === "applications" && "active")}>
                            <a className={clsx(active === "applications" && "active")}
                               href={url.applicationsUrl}>{msg("applications")}</a>
                        </li>
                        {features.log && (
                            <li className={clsx(active === "log" && "active")}>
                                <a className={clsx(active === "log" && "active")} href={url.logUrl}>{msg("log")}</a>
                            </li>
                        )}
                        {realm.userManagedAccessAllowed && features.authorization && (
                            <li className={clsx(active === "authorization" && "active")}>
                                <a className={clsx(active === "authorization" && "active")}
                                   href={url.resourceUrl}>{msg("myResources")}</a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
