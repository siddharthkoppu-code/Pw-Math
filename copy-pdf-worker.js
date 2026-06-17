// Runs automatically after "npm install".
// Copies the PDF.js worker file into /public so it can be served as a plain
// static file — this sidesteps a known Vite bug with bundling pdfjs workers.
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const src = join(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destDir = join(__dirname, 'public');
const dest = join(destDir, 'pdf.worker.min.mjs');

try {
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log('Copied pdf.worker.min.mjs into /public');
  } else {
    console.warn('Could not find pdfjs worker file to copy — PDF reading may not work.');
  }
} catch (err) {
  console.warn('pdf worker copy step failed:', err.message);
}
