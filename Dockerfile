FROM node:alpine

LABEL maintainer="kiran01bm"

# App workdir
WORKDIR /usr/src/apps/cryptocompare

# Copy package.json + package-lock.json
COPY package*.json ./

# Install the app
RUN npm install

# Copy application src
COPY . .

# Boot up the App
CMD [ "npm", "start" ]
