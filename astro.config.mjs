// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { remarkLocaleLinks } from './src/plugins/remark-locale-links.mjs';
import { remarkLightboxGallery } from './src/plugins/remark-lightbox-gallery.mjs';

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
			[remarkLocaleLinks, { base: '' }],
			remarkLightboxGallery
		],
	},
	vite: {
		plugins: [tailwind()],
	},
});
