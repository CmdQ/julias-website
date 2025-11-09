#!/usr/bin/env node
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, '../src/content/pages');

// Get all files in each locale directory
const enFiles = readdirSync(join(contentDir, 'en')).filter(f => f.endsWith('.md'));
const deFiles = readdirSync(join(contentDir, 'de')).filter(f => f.endsWith('.md'));

const enSet = new Set(enFiles);
const deSet = new Set(deFiles);

let hasErrors = false;

// Check for files only in EN
for (const file of enFiles) {
	if (!deSet.has(file)) {
		console.error(`❌ Missing German translation: ${file} (exists in en/ but not in de/)`);
		hasErrors = true;
	}
}

// Check for files only in DE
for (const file of deFiles) {
	if (!enSet.has(file)) {
		console.error(`❌ Missing English translation: ${file} (exists in de/ but not in en/)`);
		hasErrors = true;
	}
}

if (hasErrors) {
	console.error('\n🚫 Build failed: All pages must exist in both English and German.');
	process.exit(1);
} else {
	console.log('✅ i18n check passed: All pages exist in both locales.');
}
