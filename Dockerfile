# syntax=docker/dockerfile:1.7

# ---------- 1. deps: install only what's needed for build ----------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# node:20-alpine ships npm 10, but package-lock.json is written by npm 11,
# which records transitive optional deps (@emnapi/*, @swc/helpers) differently.
# npm 10 reads that as an out-of-sync lock and `npm ci` hard-fails. Match the
# npm that wrote the lock rather than loosening the install to `npm install` —
# `npm ci` is the whole point of shipping a lockfile.
RUN npm i -g npm@11 --no-audit --no-fund

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# ---------- 2. builder: compile the Next.js app ----------
FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public env vars are baked in at build time; override with --build-arg
ARG NEXT_PUBLIC_CMS_URL=http://13.60.4.75:8002
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}

RUN npm run build

# ---------- 3. runner: minimal production image ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public       ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
