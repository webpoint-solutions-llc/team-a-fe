# Use an official Node runtime as the base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the app's source code
COPY . .

# Build the Vite app (this will create the "dist" folder)
RUN yarn build

# Expose the port that serve will run on
EXPOSE 3000

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]