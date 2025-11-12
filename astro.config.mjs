// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { remarkLocaleLinks } from './src/plugins/remark-locale-links.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://cmdq.github.io',
	base: '/julias-website',
	i18n: {
		locales: ['en', 'de'],
		defaultLocale: 'de',
	},
	markdown: {
		remarkPlugins: [
			[remarkLocaleLinks, { base: '/julias-website' }]
		],
	},
	vite: {
		plugins: [tailwind()],
	},
});
