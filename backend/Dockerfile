# Use the official Node.js image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy the rest of the application code to the container image.
COPY . .

# Set environment variables
ENV NODE_ENV production
ENV PORT 3002

# Make port 5000 available to the world outside this container
EXPOSE 3002

# Run the web service on container startup.
CMD [ "node", "app.js" ]
