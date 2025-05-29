import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    preset: "cloudflare-pages",
    compatibilityDate: "2025-05-01",

    cloudflare: {
      nodeCompat: true,
      wrangler: {
        compatibility_date: "2025-05-01",
      },
    },

    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST", "async_hooks"],
    },
  },
});
