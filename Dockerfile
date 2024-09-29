# Use official Node.js image as base
FROM node:16

# Create a non-root user
RUN useradd -m appuser

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Change ownership of the /app directory
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Build the React app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
