import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), solidJs()],
  vite: {
    ssr: {
      noExternal: ["@motionone/solid", "solid-dismiss", "solid-create-form", "solid-toast"]
    }
  }
});