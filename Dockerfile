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
ENV PORT=8080
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 8080

# Copy standalone build output (includes .next, .next/static, and node_modules)
COPY --from=builder /app/.next/standalone ./

# Copy static assets
COPY --from=builder /app/.next/static ./.next/static

# Copy public directory for static assets
COPY --from=builder /app/public ./public

# Optional directories needed at runtime
COPY --from=builder /app/app/lib ./app/lib

CMD ["node", "server.js"]

