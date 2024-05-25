import { getKcContext, type KcContext } from "./kcContext";
import Main from "./main";
import type { DeepPartial } from "keycloakify/tools/DeepPartial";

export function createPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {

    const { pageId } = params;

    function PageStory(params: { kcContext?: any; }) {

        const { kcContext } = getKcContext({
            mockPageId: pageId,
            storyPartialKcContext: params.kcContext
        });

        return (
            <>
                {/* If you import custom fonts in your index.html you have to import them in storybook as well*/}
                <link rel="stylesheet" type="text/css" href="https://s3.ssegning.me/home/fonts/louis-george-cafe/99travl-font.css" />
                <Main kcContext={kcContext} />
            </>
        );

    }

    return { PageStory };

}
