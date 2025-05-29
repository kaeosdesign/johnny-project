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

| ID  | Locatie                  | Link                           | API                                                                                                                 |
| --- | ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | LMRO_1_Bucuresti_Pallady | `https://helexia.pages.dev/1`  | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=KrxkNm5kkIqIjebwe9GEoOw3eyEpvpH2` |
| 2   | LMRO_2_Targoviste        | `https://helexia.pages.dev/2`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=scMjstMcKemNehkIylqxDNGeJhxFIrPN` |
| 3   | LMRO_3_Colosseum         | `https://helexia.pages.dev/3`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=2zjM2sxxJ4ibq5f4dbJOnmQ78fxiQB8x` |
| 4   | LMRO_4_Bragadiru         | `https://helexia.pages.dev/4`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=Lb81pDGDPdJP0clGNL9rAJdvFF4j9ytq` |
| 5   | LMRO_5_Brasov            | `https://helexia.pages.dev/5`  | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=ccq2fijH6p6DrilFqtvBdiq2qaujnO9x` |
| 6   | LMRO_6_Cluj              | `https://helexia.pages.dev/6`  | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=nkQqDxxMJqb9EdsGOIBwgtyMvmHAelCM` |
| 7   | LMRO_7_Constanta         | `https://helexia.pages.dev/7`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=tho85MKyGL2q0CGwgmwHqvO1Q2lJ0Ms9` |
| 8   | LMRO_8_Craiova_Severin   | `https://helexia.pages.dev/8`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=Lc02th1b80oM2e0ot1uJ074bBnAwtHPp` |
| 9   | LMRO_9_Oradea            | `https://helexia.pages.dev/9`  | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=kHqMuDxovIPGevHuflHK2CQ1n91e8Qfq` |
| 10  | LMRO_10_Ploiesti         | `https://helexia.pages.dev/10` | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=eDbxciwrlDsJo4sfqf7hh6lJ14j5c6KL` |
| 11  | LMRO_11_Timisoara        | `https://helexia.pages.dev/11` | `https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=LjAMpFvrL17umHQ4mq2n6MdM5h5jeKfH` |
| 12  | LMRO_12_Brasov_Astra     | `https://helexia.pages.dev/12` | `https://uni004eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=JIDaQ5IfhmqMqEsp9oEKtPGyJxrpgswu` |
