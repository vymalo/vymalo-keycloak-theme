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

        return <Main kcContext={kcContext} />;

    }

    return { PageStory };

}
