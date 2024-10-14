# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files and directories into the container
COPY . .

# Build the NestJS application (this will create the dist folder)
RUN npm run build

# Stage 2: Runtime stage
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy node_modules and build files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./

# Expose the port used by the application
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
