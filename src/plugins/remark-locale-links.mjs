import { visit } from 'unist-util-visit';

/**
 * Remark plugin to transform relative links in markdown to locale-aware absolute paths.
 * 
 * Example: In a file at `src/content/pages/de/index.md`, the link `[text](./about)`
 * becomes `/de/about` (or with base URL: `/julias-website/de/about`)
 */
export function remarkLocaleLinks(options = {}) {
	const { base = '' } = options;

	return function transformer(tree, file) {
		// Extract locale from file path (e.g., 'src/content/pages/de/index.md' -> 'de')
		const filePath = file.history[0] || '';
		const localeMatch = filePath.match(/\/pages\/(en|de)\//);
		
		if (!localeMatch) {
			return; // Not a locale-specific content file
		}

		const locale = localeMatch[1];

		visit(tree, 'link', (node) => {
			const url = node.url;

			// Only transform relative links (starting with ./ or just a path without /)
			if (!url.startsWith('./') && !url.startsWith('../') && (url.startsWith('/') || url.includes('://'))) {
				return; // Already absolute or external
			}

			// Remove leading ./ if present
			const cleanPath = url.replace(/^\.\//, '');

			// Transform to locale-aware absolute path
			const newUrl = `${base}/${locale}/${cleanPath}`;
			node.url = newUrl;
		});
	};
}
