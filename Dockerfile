# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy environment variables file
COPY .env .env

# Expose the port your app runs on
EXPOSE 3000

# Specify the command to run on container start
CMD ["node", "app.js"]