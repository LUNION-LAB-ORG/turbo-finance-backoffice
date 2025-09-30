# Use the official Node.js image as the base image
FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"  
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client if schema exists
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public folder
COPY --from=builder /app/public ./public

# Copy package.json and lockfile
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Install only production dependencies with cache
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]