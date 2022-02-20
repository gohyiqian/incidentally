# Pull Docker Hub base image
FROM node:14.16.0-alpine3.10
# Set working directory
WORKDIR /usr/app
# Copy package.json to install all dependencies
COPY package*.json ./
RUN npm install
# Copy copies entire directory into the container
COPY . .
# Expose
EXPOSE 3000
# Run the "dev" script in package.json
CMD ["npm", "run", "dev"]