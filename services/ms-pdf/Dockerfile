# ms-pdf/Dockerfile
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache chromium

COPY package*.json ./

RUN corepack enable && pnpm install

COPY . .

EXPOSE 3004

CMD ["pnpm", "run", "dev"]