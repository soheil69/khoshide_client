# Step 1: Use a Node.js base image
FROM node:22-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application source code
COPY . .

# Step 6: Build the Vite React project
RUN npm run build

# Step 7: Use a lightweight web server to serve the app
FROM nginx:stable-alpine

# Set working directory inside nginx

WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets (if any)
RUN rm -rf ./*

# Copy built files from the Node.js builder stage
COPY --from=builder /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 9: Expose the appropriate port
EXPOSE 80

# Step 10: Start the web server
CMD ["nginx", "-g", "daemon off;"]