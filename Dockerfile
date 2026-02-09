# Dependencies 
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV UPLOAD_DIR=/tmp/uploads
# Disable Next.js telemetry to avoid external network calls
ENV NEXT_TELEMETRY_DISABLED=1

# Create upload dir
RUN mkdir -p /tmp/uploads

# Copy standalone build output (includes .next, .next/static, and node_modules)
COPY --from=builder /app/.next/standalone ./

# Copy public directory for static assets
COPY --from=builder /app/public ./public

# Copy app/lib directory (contains data files that might be needed at runtime)
COPY --from=builder /app/app/lib ./app/lib

EXPOSE 3000

# Health check to verify the app is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

CMD ["node", "server.js"]

