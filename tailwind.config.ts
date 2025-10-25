import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					light: '#f1ede4',
					sand: '#d9c8a9',
					dark: '#3b372f',
				},
			},
			fontFamily: {
				headings: ['"Work Sans"', 'ui-sans-serif', 'system-ui'],
				body: ['"Source Serif Pro"', 'ui-serif', 'Georgia'],
			},
		},
	},
	plugins: [typography()],
} satisfies Config;
