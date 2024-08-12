# Use the Node.js 20 image
FROM node:20

# Create and change to the /frontend directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the frontend dev server port
EXPOSE 5173

# Start the frontend server
CMD ["npm", "run", "dev"]