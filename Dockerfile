# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the app's source code
COPY . .

# Build the Vite app (this will create the "dist" folder)
RUN yarn build

# Stage 2: Runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only the built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./package.json
COPY --from=build /app/yarn.lock ./yarn.lock

# Install only production dependencies
RUN yarn install --production

# Expose the port that serve will run on
EXPOSE 3000

# Ensure the app listens on 0.0.0.0
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]