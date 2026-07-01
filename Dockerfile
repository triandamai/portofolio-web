# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build the app
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application and static assets from builder stage
COPY --from=builder /app/build ./build

# Copy content directory which SvelteKit reads via fs.readFileSync at runtime
COPY --from=builder /app/src/lib/content ./src/lib/content

# Expose port and start the application
EXPOSE 3000
ENV PORT=3000
CMD ["node", "build/index.js"]
