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
  console.warn('Warning: out directory does not exist. This script is only needed for static export builds.');
  console.warn('For Vercel deployments, use "npm run build" instead of "npm run build:export"');
  process.exit(0); // Exit gracefully instead of erroring
}

// Write the redirect file
fs.writeFileSync(rootIndexPath, redirectHtml, 'utf8');
console.log('✓ Created root index.html redirect file');

