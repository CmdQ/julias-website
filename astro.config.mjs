// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://cmdq.github.io',
	base: '/julias-website',
	i18n: {
		locales: ['en', 'de'],
		defaultLocale: 'de',
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwind()],
	},
});
