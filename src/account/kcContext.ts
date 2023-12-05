import { createGetKcContext } from "keycloakify/account";
import {ThemeName} from "../components/theme-name";

export type KcContextExtension =
	| { pageId: "my-extra-page-1.ftl"; }
	| { pageId: "my-extra-page-2.ftl"; someCustomValue: string; };

export const { getKcContext } = createGetKcContext<KcContextExtension>({
	mockData: [
		{
			pageId: "my-extra-page-2.ftl",
			someCustomValue: "foo bar"
		},
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
