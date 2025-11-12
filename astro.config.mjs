// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://cmdq.github.io',
	base: '/julias-website',
	i18n: {
		locales: ['en', 'de'],
		defaultLocale: 'en',
	},
	vite: {
		plugins: [tailwind()],
	},
});
