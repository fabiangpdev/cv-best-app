# ms-cv/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN corepack enable && pnpm install

COPY . .

EXPOSE 3002

CMD ["pnpm", "run", "dev"]