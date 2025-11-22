FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

# 如果你有 .env，請在 compose 用 volumes 掛進來
EXPOSE 8000

CMD ["node", "dist/main.js"]
