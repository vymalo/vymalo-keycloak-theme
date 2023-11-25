import {createGetKcContext} from "keycloakify/login";

export type KcContextExtension =
// WARNING: It's important to keep in sync the extraThemeProperties declared in the package.json and this type definition.
    | { pageId: "login.ftl"; extraThemeProperties: { foo: string; }; }
    | { pageId: "my-extra-page-1.ftl"; }
    | { pageId: "my-extra-page-2.ftl"; someCustomValue: string; }
    // NOTE: register.ftl is deprecated in favor of register-user-profile.ftl
    // but let's say we use it anyway and have this plugin enabled: https://github.com/micedre/keycloak-mail-whitelisting
    // keycloak-mail-whitelisting define the non standard ftl global authorizedMailDomains, we declare it here.
    | {
    pageId: "register.ftl"; authorizedMailDomains: string[]; register: {
        formData: {
            'user.attributes.phone': string;
        }
    }
};

//NOTE: In most of the cases you do not need to overload the KcContext, you can 
// just call createGetKcContext(...) without type arguments.  
// You want to overload the KcContext only if:  
// - You have custom plugins that add some values to the context (like https://github.com/micedre/keycloak-mail-whitelisting that adds authorizedMailDomains)
// - You want to add support for extra pages that are not yey featured by default, see: https://docs.keycloakify.dev/contributing#adding-support-for-a-new-page
export const {getKcContext} = createGetKcContext<KcContextExtension>({
    mockData: [
        {
            pageId: "login.ftl",
            locale: {
                //When we test the login page we do it in french
                currentLanguageTag: "fr",
            },
            //Uncomment the following line for hiding the Alert message
            //"message": undefined
            //Uncomment the following line for showing an Error message
            // message: { type: "error", summary: "This is an error" },
            social: {
                providers: [
                    {
                        providerId: "google",
                        displayName: "Login with Google",
                        alias: "google",
                        loginUrl: "#",
                    },
                    {
                        providerId: "facebook",
                        displayName: "Login with Facebook",
                        alias: "facebook",
                        loginUrl: "#",
                    },
                ],
                displayInfo: true,
            },
        },
        {
            pageId: "login-username.ftl",
            locale: {
                //When we test the login page we do it in french
                currentLanguageTag: "en",
            },
            //Uncomment the following line for hiding the Alert message
            //"message": undefined
            //Uncomment the following line for showing an Error message
            // message: { type: "error", summary: "This is an error" },
            social: {
                providers: [
                    {
                        providerId: "google",
                        displayName: "Login with Google",
                        alias: "google",
                        loginUrl: "#",
                    },
                    {
                        providerId: "facebook",
                        displayName: "Login with Facebook",
                        alias: "facebook",
                        loginUrl: "#",
                    },
                ],
                displayInfo: true,
            },
            realm: {},
        },
        {
            pageId: "login-password.ftl",
            locale: {
                //When we test the login page we do it in french
                currentLanguageTag: "fr",
            },
            //Uncomment the following line for hiding the Alert message
            //"message": undefined
            //Uncomment the following line for showing an Error message
            // message: { type: "error", summary: "This is an error" },
            social: {
                displayInfo: true,
            }
        },
        {
            pageId: "my-extra-page-2.ftl",
            someCustomValue: "foo bar baz"
        },
        {
            //NOTE: You will either use register.ftl (legacy) or register-user-profile.ftl, not both
            pageId: "register-user-profile.ftl",
            locale: {
                //When we test the login page we do it in french
                currentLanguageTag: "fr",
            },
            profile: {
                attributes: [
                    {
                        validators: {
                            pattern: {
                                pattern: "^[a-zA-Z0-9]+$",
                                "ignore.empty.value": true,
                                // eslint-disable-next-line no-template-curly-in-string
                                "error-message": "${alphanumericalCharsOnly}",
                            },
                        },
                        //NOTE: To override the default mock value
                        value: undefined,
                        name: "username"
                    },
                    {
                        validators: {
                            options: {
                                options: ["male", "female", "non-binary", "transgender", "intersex", "non_communicated"]
                            }
                        },
                        // eslint-disable-next-line no-template-curly-in-string
                        displayName: "${gender}",
                        annotations: {},
                        required: true,
                        groupAnnotations: {},
                        readOnly: false,
                        name: "gender"
                    }
                ]
            }
        },
        {
            pageId: "register.ftl",
            authorizedMailDomains: [
                "example.com",
                "another-example.com",
                "*.yet-another-example.com",
                "*.example.com",
                "hello-world.com"
            ],
            // Simulate we got an error with the email field
            messagesPerField: {
                printIfExists: <T>(fieldName: string, className: T) => {
                    console.log({fieldName});
                    return fieldName === "email" ? className : undefined;
                },
                existsError: (fieldName: string) => fieldName === "email",
                get: (fieldName: string) => `Fake error for ${fieldName}`,
                exists: (fieldName: string) => fieldName === "email"
            },
            register: {
                formData: {
                    firstName: "John",
                }
            }
        },
        {
            pageId: 'info.ftl',
            message: {
                type: 'error',
                summary: 'This is an error'
            }
        }
    ]
});

export const {kcContext} = getKcContext({
    // Uncomment to test the login page for development.
    mockPageId: "login.ftl",
});


export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;