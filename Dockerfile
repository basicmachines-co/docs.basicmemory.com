FROM node:22-bullseye AS build
WORKDIR /app

ARG CACHE_BUST=unknown

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build the application
RUN npx nuxt prepare && npx nuxt build

# Production image
FROM node:22-slim AS prod

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
