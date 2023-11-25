import { getKcContext, type KcContext } from "./kcContext";
import Main from "./main";
import type { DeepPartial } from "keycloakify/tools/DeepPartial";

export function createPageStory<PageId extends KcContext["pageId"]>(params: {
    pageId: PageId;
}) {

    const { pageId } = params;

    function PageStory(params: { kcContext?: DeepPartial<Extract<KcContext, { pageId: PageId }>>; }) {

        const { kcContext } = getKcContext({
            mockPageId: pageId,
            storyPartialKcContext: params.kcContext
        });

        return (
            <>
                {/* If you import custom fonts in your index.html you have to import them in storybook as well*/}
                <link rel="stylesheet" type="text/css" href="fonts/WorkSans/font.css" />
                <Main kcContext={kcContext} />
            </>
        );

    }

    return { PageStory };

}
