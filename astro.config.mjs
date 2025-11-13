// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { remarkLocaleLinks } from './src/plugins/remark-locale-links.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://julia-salomon.de',
	base: '/',
	i18n: {
		locales: ['en', 'de'],
		defaultLocale: 'de',
	},
	markdown: {
		remarkPlugins: [
			[remarkLocaleLinks, { base: '' }]
		],
	},
	vite: {
		plugins: [tailwind()],
	},
});
