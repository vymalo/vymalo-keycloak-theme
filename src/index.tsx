import './index.scss';

import {createRoot} from "react-dom/client";
import {lazy, StrictMode, Suspense} from "react";
import {kcContext as kcLoginThemeContext} from "./login/kcContext";
import {kcContext as kcAccountThemeContext} from "./account/kcContext";

const KcLoginThemeApp = lazy(() => import("./login/main"));
const KcAccountThemeApp = lazy(() => import("./account/main"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense>
            {(() => {

                if (kcLoginThemeContext !== undefined) {
                    return <KcLoginThemeApp kcContext={kcLoginThemeContext}/>;
                }

                if (kcAccountThemeContext !== undefined) {
                    return <KcAccountThemeApp kcContext={kcAccountThemeContext}/>;
                }

                throw new Error(
                    "This app is a Keycloak theme. " +
                    "It isn't meant to be deployed outside of Keycloak"
                );

            })()}
        </Suspense>
    </StrictMode>
);

