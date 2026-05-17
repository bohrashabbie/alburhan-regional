# Infrastructure to-do — initial-load performance

Code-side optimisations have all been deployed (see commit `d668d12`).
The remaining wins live in AWS / infra and need console access. They are
ordered by impact for **MENA visitors** (the current audience).

---

## 1. CloudFront in front of the website  (biggest single win, ~$5–15/mo)

The site currently resolves directly to the EC2 IP in **eu-north-1** (Stockholm).
Every byte travels ~5 000 km to UAE/Egypt/Saudi. CloudFront caches the
already-compressed HTML and static assets at edge locations in **Bahrain,
Dubai, Cairo, Mumbai** — round-trip drops from ~200 ms to <10 ms.

### Steps

1. Open **AWS Console → CloudFront → Create distribution**.
2. **Origin**
   - Origin domain: `alburhan-regional.com`
   - Protocol: `HTTPS only`
   - Origin path: empty
   - Name: `alburhan-origin`
   - Custom headers: none
3. **Default cache behavior**
   - Viewer protocol policy: `Redirect HTTP to HTTPS`
   - Allowed methods: `GET, HEAD, OPTIONS`
   - Cache policy: `CachingOptimized`
   - Origin request policy: `AllViewerExceptHostHeader`
   - Response headers policy: `SecurityHeadersPolicy`
   - Compress objects automatically: **On**
4. **Additional behaviors** (click "Create behavior" for each):
   - Path pattern: `/api/*` → Cache policy: **CachingDisabled** (API responses
     must be live).
   - Path pattern: `/_next/static/*` → Cache policy: **CachingOptimized**, TTL 1 year.
   - Path pattern: `/_next/image*` → Cache policy: **CachingOptimized**, TTL 7 days.
5. **Settings**
   - Price class: `Use only North America, Europe, Asia, Middle East, and Africa`
     (covers MENA at lowest cost; full global is ~30 % more expensive).
   - Alternate domain names (CNAMEs): `alburhan-regional.com`, `www.alburhan-regional.com`
   - SSL certificate: request a new ACM cert in **us-east-1** (CloudFront requirement)
     for those two names, validate via DNS.
   - Security policy: `TLSv1.2_2021`
   - HTTP/3: **Enable**
   - HTTP/2: **Enable**
6. **Create distribution** — wait ~10 minutes for deployment.
7. **DNS cutover**
   - Note the CloudFront domain (e.g. `d1xxxxxx.cloudfront.net`).
   - In your DNS provider, change the A/AAAA records for `alburhan-regional.com`
     and `www.alburhan-regional.com` from the EC2 IP to a `CNAME` (or ALIAS)
     pointing to the CloudFront domain.
   - TTL: drop to 60 s before changing, then raise to 3600 once stable.
8. **Verify**: `curl -I https://alburhan-regional.com/` should now return
   `Server: CloudFront` and `X-Cache: Hit from cloudfront` on the second hit.

### After cutover — tighten EC2

Once CloudFront is in front, lock the origin so visitors cannot bypass the CDN:
```bash
# In AWS Console -> EC2 -> Security Groups -> the SG attached to the instance:
# Replace 0.0.0.0/0 on 443/80 inbound with CloudFront's managed prefix list:
#   com.amazonaws.global.cloudfront.origin-facing
```

---

## 2. CloudFront in front of S3 bucket  (compounds with #1)

The S3 bucket `alburhan-asset` is in **eu-north-1**. Image URLs currently
resolve directly to the bucket origin. Same MENA-latency problem.

### Steps

1. **CloudFront → Create distribution** (second one).
2. **Origin**
   - Origin domain: pick `alburhan-asset.s3.eu-north-1.amazonaws.com` from the list
     (CloudFront will autofill the `.s3-website-` suffix correctly).
   - Origin access: **Origin access control (OAC)** → Create new → sign requests.
     CloudFront will give you a bucket policy snippet — paste it into the S3
     bucket policy.
3. **Default cache behavior**
   - Viewer protocol policy: `Redirect HTTP to HTTPS`
   - Cache policy: `CachingOptimized`
   - Compress objects automatically: **On**
4. **Alternate domain name**: `cdn.alburhan-regional.com` (recommended — your
   own subdomain looks professional and lets you swap CDN providers later).
   Request an ACM cert for it in `us-east-1`.
5. **Create distribution**, note the domain (e.g. `d2yyyyy.cloudfront.net`).
6. **DNS**: create `cdn.alburhan-regional.com` CNAME → CloudFront domain.
7. **Update the app**: change `NEXT_PUBLIC_S3_BASE_URL` in
   [docker-compose.yml](docker-compose.yml):
   ```yaml
   NEXT_PUBLIC_S3_BASE_URL: https://cdn.alburhan-regional.com
   ```
   Then rebuild: `docker compose build && docker compose up -d`.

`next.config.ts` already allows `*.cloudfront.net` in `images.remotePatterns`,
but if you use the custom `cdn.alburhan-regional.com` domain add it to that
array too:
```ts
{ protocol: 'https', hostname: 'cdn.alburhan-regional.com', pathname: '/**' },
```

---

## 3. Upgrade EC2 from t3.medium → t3.large  (+ ~$30/mo, easy win)

Current instance runs Next.js (image optimizer is CPU-heavy), FastAPI CMS,
Angular admin, email service, and nginx all on **2 vCPU / 4 GB RAM**.
The image optimizer encode times we measured (~2.5 s for a 1080w AVIF) are
CPU-bound — t3.large doubles RAM (4 → 8 GB) so optimized images stay in
OS page cache, and bursts have more headroom.

### Steps

1. **EC2 console → Instances → select the instance → Stop** (warn users: brief downtime).
2. **Actions → Instance settings → Change instance type → t3.large**.
3. **Start** the instance. Elastic IP stays the same so no DNS change needed.
4. SSH in and verify services:
   ```bash
   docker ps
   sudo systemctl status nginx
   curl -I https://alburhan-regional.com/
   ```

Downtime: ~2 minutes. No code changes.

---

## 4. Move S3 bucket to me-south-1  (optional, redundant with #2)

If you do **CloudFront for S3 (#2)** you don't need this — CloudFront edges
cache the assets at MENA POPs already. Only do this if you skip CloudFront
entirely.

### Steps (high level)

1. Create new bucket `alburhan-asset-me` in **me-south-1** (Bahrain) or
   **me-central-1** (UAE).
2. Use AWS DataSync or `aws s3 sync` to copy all objects.
3. Apply the same bucket policy.
4. Update `NEXT_PUBLIC_S3_BASE_URL` in `docker-compose.yml`.
5. Once verified, delete the old `eu-north-1` bucket.

---

## 5. Move EC2 to me-south-1 / me-central-1  (optional, big infrastructure change)

If CloudFront still isn't fast enough (it should be — page-cached HTML at
the edge is essentially instant for MENA), the last lever is moving the
origin itself closer.

### Steps (high level)

1. Take an AMI snapshot of the current instance: **EC2 → Instances → Actions
   → Image and templates → Create image**.
2. In the target region (`me-south-1`), launch a new instance from that AMI
   at the desired size.
3. Allocate an Elastic IP in the new region and attach it.
4. Update DNS: A record → new EIP.
5. Re-issue Let's Encrypt cert on the new instance:
   `sudo certbot --nginx -d alburhan-regional.com -d www.alburhan-regional.com`
6. Verify all services, then terminate the old instance.

### Trade-offs

- AWS pricing for me-south-1 is **~10–15 % more** than eu-north-1.
- All AWS services your CMS uses (S3, SES if you use it, RDS) should ideally
  live in the same region — otherwise you re-introduce cross-region latency.

---

## Recommended order

1. **Today:** Item **#3** (resize to t3.large) — 5 min, no DNS change, gives the
   image optimizer breathing room.
2. **This week:** Items **#1 + #2** (CloudFront for site + S3). The single
   biggest geographic win. ~$10–20/mo total.
3. **Re-measure:** Run [scripts/measure_payload.py](scripts/measure_payload.py)
   and use WebPageTest from a Dubai test node to confirm < 2 s LCP.
4. **Only if still slow:** Items **#4 / #5** (region moves). These are
   high-effort and CloudFront usually makes them unnecessary.

---

## Verification commands

After each change run these from a machine outside AWS:

```bash
# HTTP/2 + cache
curl -sI --http2 https://alburhan-regional.com/ | head -5

# CloudFront present?
curl -sI https://alburhan-regional.com/ | grep -i 'x-cache\|server\|via'
# Should show: Server: CloudFront,  X-Cache: Hit from cloudfront

# Image optimizer working?
curl -sI 'https://alburhan-regional.com/_next/image/?url=<encoded-image-url>&w=1080&q=75' \
  -H 'Accept: image/avif,image/webp' | grep -i 'content-type\|content-length'

# Full page load timing
curl -o /dev/null -s -w 'dns=%{time_namelookup} tcp=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\n' \
  https://alburhan-regional.com/
```
