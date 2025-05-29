# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments. 

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

This project was build with Cloudflare Pages deployment in mind and it uses the "cloudflare-pages" preset.

Reference docs https://developers.cloudflare.com/workers/runtime-apis/nodejs/ for node runtime compatibility.


## Environment

Set API column values as `[vars]` in `wrangler.toml` to have them included  at buildtime and under `[env.production.vars]` to be accesible at runtime via `process.env`.

| ID  | Locatie                  | Link                           | API                                                                                                                      |
| --- | ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | SMH - R&D Johnny boy     | `https://helexia.pages.dev/1`  | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=Q5bK7jqK0r5BnAysa1cmMtz4gLFzDxj3` |



