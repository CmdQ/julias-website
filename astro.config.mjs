// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://julia-salomon.de',
	base: '/',
	i18n: {
		locales: ['en', 'de'],
		defaultLocale: 'de',
	},
	integrations: [mdx()],
	vite: {
		plugins: [tailwind()],
	},
});
