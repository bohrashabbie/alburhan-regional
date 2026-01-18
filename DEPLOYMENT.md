# Deployment Guide

## Vercel Deployment (Recommended)

### Quick Deployment Steps

1. **Connect to Vercel:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project directory
   - Or connect your GitHub/GitLab/Bitbucket repository to Vercel dashboard

2. **Deploy:**
   ```bash
   vercel --prod
   ```
   
   Or push to your connected repository - Vercel will auto-deploy

3. **Environment Variables:**
   - Vercel automatically detects Next.js projects
   - No additional configuration needed
   - All features (SSR, Image Optimization, etc.) work out of the box

### Vercel Configuration

✅ **Image Optimization** - Enabled (no `unoptimized: true`)  
✅ **Server-Side Rendering** - Full Next.js support  
✅ **Internationalization** - next-intl works perfectly  
✅ **Automatic Deployments** - On every git push  

The project is configured with:
- `vercel.json` - Routing and security headers
- `next.config.ts` - Optimized for Vercel (not static export)

---

## GoDaddy Deployment (Static Export)

## Quick Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to GoDaddy:**
   - Upload ALL contents from the `out/` directory to `public_html`
   - Ensure `.htaccess` is uploaded (it's automatically copied)

3. **Verify deployment:**
   - Visit your domain
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

## Fixing Cache Issues

If your changes aren't showing up after deployment:

### Immediate Solutions:

1. **Hard Refresh Your Browser:**
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
   - Or use Incognito/Private browsing mode

2. **Clear GoDaddy Cache:**
   - Log into GoDaddy hosting control panel
   - Navigate to "Performance" or "Cache" settings
   - Clear/disable caching (if available)

3. **Verify File Upload:**
   - Check that file timestamps on server match your local build
   - Ensure ALL files from `out/` were uploaded (not just changed ones)
   - Verify `.htaccess` file is present and has latest content

4. **Check File Permissions:**
   - `.htaccess` should be `644` (readable)
   - All files should be `644`
   - All directories should be `755`

5. **Force Complete Rebuild:**
   ```bash
   # Delete old build
   rm -rf out .next
   
   # Rebuild fresh
   npm run build
   
   # Upload ALL files again (not just changed ones)
   ```

### What We've Configured:

✅ **HTML files** - No cache (always fresh)  
✅ **CSS/JS files** - No cache (updates immediately)  
✅ **Images** - Long cache (performance)  
✅ **ETags disabled** - Prevents caching issues  
✅ **Next.js assets** - Cached (they have hashes in filenames)

### Testing After Deployment:

1. Open site in Incognito/Private mode
2. Check browser DevTools → Network tab
3. Look for `Cache-Control` headers on HTML/CSS/JS files
4. They should show `no-cache, no-store, must-revalidate`

### Common Issues:

**Issue:** Changes not showing even after hard refresh  
**Solution:** GoDaddy might have server-side caching. Contact support to disable it.

**Issue:** Some files update but others don't  
**Solution:** Upload ALL files from `out/` directory, not just changed ones.

**Issue:** `.htaccess` not working  
**Solution:** Check file permissions (644) and ensure it's in the root directory.

**Issue:** Site shows old version  
**Solution:** Wait 5-30 minutes for DNS/CDN propagation, or clear GoDaddy cache.

## File Structure After Build

```
out/
├── .htaccess          ← Important! Must be uploaded
├── index.html         ← Root redirect
├── en/
│   ├── index.html
│   ├── about/
│   └── ...
├── ar/
│   ├── index.html
│   └── ...
└── _next/
    └── static/       ← Next.js assets (cached)
```

## Need More Help?

- Check `.htaccess` file is uploaded correctly
- Verify all files from `out/` directory are on server
- Test in Incognito mode to bypass browser cache
- Contact GoDaddy support if server-side caching persists

