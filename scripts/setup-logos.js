// scripts/setup-logos.js
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BASE_DIR = dirname(__dirname);

// Logo SVG content
const LOGOS = {
  'logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="90" fill="#2563eb" />
    <path d="M60 130 L80 70 L100 110 L120 70 L140 130" 
          stroke="white" 
          stroke-width="12" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
    <path d="M40 85 L55 100 L40 115" 
          stroke="white" 
          stroke-width="8" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
    <path d="M160 85 L145 100 L160 115" 
          stroke="white" 
          stroke-width="8" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
  </svg>`,
  'favicon.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="#2563eb" />
    <path d="M8 24 L12 8 L16 18 L20 8 L24 24" 
          stroke="white" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
  </svg>`,
  'logo-light.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="90" fill="white" />
    <path d="M60 130 L80 70 L100 110 L120 70 L140 130" 
          stroke="#2563eb" 
          stroke-width="12" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
    <path d="M40 85 L55 100 L40 115" 
          stroke="#2563eb" 
          stroke-width="8" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
    <path d="M160 85 L145 100 L160 115" 
          stroke="#2563eb" 
          stroke-width="8" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          fill="none" />
  </svg>`
};

async function createDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

async function createFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log(`Created file: ${filePath}`);
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error);
  }
}

async function setupLogoStructure() {
  try {
    // Create directories
    const directories = [
      path.join(BASE_DIR, 'public'),
      path.join(BASE_DIR, 'src', 'assets'),
      path.join(BASE_DIR, 'src', 'assets', 'logos')
    ];

    for (const dir of directories) {
      await createDirectory(dir);
    }

    // Create logo files
    for (const [filename, content] of Object.entries(LOGOS)) {
      // Save in public folder
      await createFile(
        path.join(BASE_DIR, 'public', filename),
        content
      );
      // Save in assets folder
      await createFile(
        path.join(BASE_DIR, 'src', 'assets', 'logos', filename),
        content
      );
    }

    console.log('Logo setup completed successfully!');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

// Run the setup
setupLogoStructure();