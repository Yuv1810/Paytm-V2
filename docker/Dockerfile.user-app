# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run db:generate
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start-user-app"]
