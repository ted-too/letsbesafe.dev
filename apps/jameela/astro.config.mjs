import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  server: { port: 3001 },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    solidJs(),
  ],
});
