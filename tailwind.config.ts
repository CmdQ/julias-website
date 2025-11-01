import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				headings: ['"Work Sans"', 'ui-sans-serif', 'system-ui'],
				body: ['"Source Serif Pro"', 'ui-serif', 'Georgia'],
			},
		},
	},
	plugins: [typography()],
} satisfies Config;
