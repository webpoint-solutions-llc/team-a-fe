# Stage 1: install
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build && yarn cache clean --all

# Stage 2: build
FROM node:22-alpine AS prune
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock
RUN yarn install --production --frozen-lockfile && yarn cache clean --all

# Stage 3: runtime
FROM nginx:alpine AS runtime
COPY --from=prune /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]