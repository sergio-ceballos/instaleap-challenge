# dev dependencies
FROM node:20.18-alpine AS dev-deps
WORKDIR /app
COPY package.json ./
RUN yarn install

# builder
FROM node:20.18-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn test && yarn build

# prod dependencies
FROM node:20.18-alpine AS prod-deps
WORKDIR /app
COPY package.json ./
RUN yarn install --prod

# runner
FROM node:20.18-alpine AS runner
WORKDIR /app
COPY .env .env
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node", "dist/server.js" ]
