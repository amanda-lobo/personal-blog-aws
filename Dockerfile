FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:20-alpine

WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app ./
COPY --from=builder /app/node_modules ./node_modules

USER app

EXPOSE 3000

CMD ["node", "index.js"]
