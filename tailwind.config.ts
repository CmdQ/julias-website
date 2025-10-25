import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					bg: '237 235 180', // Main background - warm cream
					highlight: '226 219 70', // Highlight color - vibrant yellow-green
					dark: '#3b372f', // Keep existing dark for text
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
