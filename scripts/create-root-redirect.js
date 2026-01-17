const fs = require('fs');
const path = require('path');

// This script creates a root index.html that redirects to /en/
// It should be run after 'next build'

const outDir = path.join(process.cwd(), 'out');
const rootIndexPath = path.join(outDir, 'index.html');

// Create a simple HTML file that redirects to /en/
const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/en/">
  <link rel="canonical" href="/en/">
  <script>
    // Immediate redirect
    window.location.replace('/en/');
  </script>
  <title>Redirecting...</title>
</head>
<body>
  <p>If you are not redirected automatically, <a href="/en/">click here</a>.</p>
</body>
</html>`;

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
  console.error('Error: out directory does not exist. Please run "npm run build" first.');
  console.error('Make sure output: "export" is enabled in next.config.ts for static export builds.');
  process.exit(1);
}

// Write the redirect file
fs.writeFileSync(rootIndexPath, redirectHtml, 'utf8');
console.log('✓ Created root index.html redirect file');

// Copy .htaccess file to out directory if it exists in root
const htaccessSource = path.join(process.cwd(), '.htaccess');
const htaccessDest = path.join(outDir, '.htaccess');

if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✓ Copied .htaccess file to out directory');
} else {
  console.warn('Warning: .htaccess file not found in root directory');
}

