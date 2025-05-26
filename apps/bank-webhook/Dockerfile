# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /backend-app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5500
CMD ["npm", "start"]
