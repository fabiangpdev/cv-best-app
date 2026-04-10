# ms-pdf/Dockerfile
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache chromium

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "run", "dev"]