import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
	plugins: [typography()],
} satisfies Config;
