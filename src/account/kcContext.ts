import { createGetKcContext } from "keycloakify/account";
import {ThemeName} from "../components/theme-name";

export type KcContextExtension = never;

export const { getKcContext } = createGetKcContext<KcContextExtension>({
	mockData: [
		{
			pageId: "password.ftl",
			themeName: ThemeName.vymaloTheme,
		}
	]
});

export const { kcContext } = getKcContext({
	// mockPageId: 'password.ftl',
});

export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
