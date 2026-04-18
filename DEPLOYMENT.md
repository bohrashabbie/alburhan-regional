# Deployment Guide

## Docker Deployment (Recommended for self-hosted / VPS)

The project ships with a production-ready multi-stage `Dockerfile` and a
`docker-compose.yml` that runs the Next.js standalone server on port 3000.

### 1. Prerequisites on the server

- Docker Engine 24+ and Docker Compose v2
- Port 3000 free (or change the host mapping in `docker-compose.yml`)

### 2. First-time deploy

```bash
# 1. Clone the repo
git clone <this-repo-url> alburhan-regional
cd alburhan-regional

# 2. Create the env file (edit values if your CMS host differs)
cp .env.production.example .env

# 3. Build and start
docker compose up -d --build

# 4. Tail the logs until you see "Ready"
docker compose logs -f web
```

The site is now live at `http://<server-ip>:3000`.

### 3. Updating the site (zero-downtime-ish)

```bash
git pull
docker compose up -d --build
docker image prune -f
```

Compose replaces the container only after the new image is healthy.

### 4. Running behind Nginx / a reverse proxy

Point your public domain (e.g. `alburhan.com`) to the server and proxy
`/` to `http://127.0.0.1:3000`. Make sure to forward the `Host` and
`X-Forwarded-*` headers so Next.js generates correct absolute URLs.

Sample Nginx block:

```nginx
server {
    listen 443 ssl http2;
    server_name alburhan.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5. Environment variables

| Name                    | Purpose                                           | Default                    |
| ----------------------- | ------------------------------------------------- | -------------------------- |
| `NEXT_PUBLIC_CMS_URL`   | Base URL of the FastAPI CMS; baked into bundle   | `http://13.60.4.75:8002`   |
| `PORT`                  | Port the Node server listens on inside container | `3000`                     |

> `NEXT_PUBLIC_*` values are resolved at **build time**, so a rebuild is
> required whenever you change the CMS URL (`docker compose up -d --build`).

### 6. Useful commands

```bash
docker compose ps                  # status
docker compose logs -f web         # follow logs
docker compose restart web         # restart
docker compose down                # stop and remove
docker compose exec web sh         # shell inside container
```

---

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

