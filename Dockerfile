FROM node:24-alpine AS base
WORKDIR /app

# Dependencies
FROM base as deps
COPY package.json package-lock.json
RUN npm ci

#Build
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV UPLOAD_DIR=/tmp/uploads

# Create upload dir
RUN MKDIR -p /tmp/uploads

COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]

