# Use the Node.js 20 image
FROM node:20
 
# Create and change to the /app directory
WORKDIR /app
 
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Install build tools
RUN apt-get update && apt-get install -y build-essential
 
# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8000
 
# Start the server
CMD ["node", "index.js"]