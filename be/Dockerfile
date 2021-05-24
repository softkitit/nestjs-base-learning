FROM node:12.4.0

# Set working dir in the container to /
WORKDIR /app

# Copy application to / directory and install dependencies
COPY package*.json /app/

RUN npm install
COPY . .
RUN npm run build
# Expose port 14047 to the outside once the container has launched
EXPOSE 14047

# what should be executed when the Docker image is launching
CMD [ "npm", "run", "start:prod" ]
