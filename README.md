<p align="center">
    <i>🚀 A starter/demo project for <a href="https://keycloakify.dev">Keycloakify</a> v8 🚀</i>
    <br/>
    <br/>
    <img src="https://github.com/vymalo/vymalo-keycloak-theme/workflows/ci/badge.svg?branch=main">
    <br/>
    <br/>
    <a href="https://accounts.vymalo.com">Authenticated React SPA</a>
</p>

# Introduction

This repo constitutes an easily reusable setup for a standalone Keycloak theme project OR for a SPA React App that
generates a Keycloak theme that goes along with it. If you are only looking to create a theme (and not a theme + an App)
there are a lot of things that you can remove from this starter: [Please read this section of the README](#standalone-keycloak-theme).

> ❗️ WARNING ❗️: Don't waste time trying to port this setup to [Vite](https://vitejs.dev/).  
> Currently Keycloakify only works collocated with Webpack projects
> but [we are working toward enabling collocation with Vite](https://github.com/keycloakify/keycloakify/pull/275)!

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter

cd keycloakify-starter

yarn # install dependencies (it's like npm install)

yarn storybook # Start Storybook
               # This is by far the best way to develop your theme
               # This enable to quickly see your pages in isolation and in different states.  
               # You can create stories even for pages that you haven't explicitly overloaded. See src/keycloak-theme/login/pages/LoginResetPassword.stories.tsx
               # See Keycloakify's storybook for if you need a starting point for your stories: https://github.com/keycloakify/keycloakify/tree/main/stories

yarn start # See the Hello World app
           # Uncomment line 97 of src/keycloak-theme/login/kcContext where it reads: `mockPageId: "login.ftl"`, reload https://localhost:3000
           # You can now develop your Login pages. (Don't forget to comment it back when you're done)

yarn build-keycloak-theme # Actually build the theme
                          # Read the instruction printed on the console to see how to test
                          # your theme on a real Keycloak instance.

npx eject-keycloak-page # Prompt that let you select the pages you want to customize
                        # This CLI tools is not guaranty to work, you can always copy pase pages 
                        # from the Keycloakify repo.

npx initialize-email-theme # For initializing your email theme
                           # Note that Keycloakify does not feature React integration for email yet.

npx download-builtin-keycloak-theme # For downloading the default theme (as a reference)
                                    # Look for the files in build_keycloak/src/main/resources/theme/{base,keycloak}
```

# The CI workflow

- You need to manually allow GitHub Action to push on your repository. For this reason the initial setup will fail. You
  need to enabled permission and re-run failed
  job: [see video](https://user-images.githubusercontent.com/6702424/213480604-0aac0ea7-487f-491d-94ae-df245b2c7ee8.mov).
- To release **don't create a tag manually**, the CI do it for you. Just update the `package.json`'s version field and
  push.
- The `.jar` files that bundle the Keycloak theme will be attached as an asset with every GitHub
  release. [Example](https://github.com/vymalo/vymalo-keycloak-theme/releases/tag/v0.1.0). The permalink to download the
  latest version is: `https://github.com/vymalo/vymalo-keycloak-theme/releases/latest/download/keycloak-theme.jar`.

![image](https://user-images.githubusercontent.com/6702424/229296422-9d522707-114e-4282-93f7-01ca38c3a1e0.png)

![image](https://user-images.githubusercontent.com/6702424/229296556-a69f2dc9-4653-475c-9c89-d53cf33dc05a.png)

# The storybook

![image](https://user-images.githubusercontent.com/6702424/232350420-1921af90-d33e-492e-9296-0083298a84fa.png)

```bash
yarn
yarn storybook
```

# Docker

Instructions for building and running the react app (`src/App`) that is collocated with our Keycloak theme.

```bash
docker build -f Dockerfile -t keycloakify/keycloakify-starter:main .
docker run -it -dp 8083:80 keycloakify/keycloakify-starter:main
# You can access the app at http://localhost:8083
```