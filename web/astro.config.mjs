// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import path from 'path';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // In Astro 5.x, use 'server' for SSR with static pages opt-in via `export const prerender = true`
  output: 'server',
  adapter: vercel(),
  integrations: [react(), icon()],
  vite: {
    resolve: {
      alias: {
        '~@opensciencearchive/ui': path.resolve('./node_modules/@opensciencearchive/ui/ui'),
      },
    },
  },
});