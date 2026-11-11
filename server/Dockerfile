FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose server port
EXPOSE 5000

# Start server in dev mode
CMD ["npm", "run", "dev"]
