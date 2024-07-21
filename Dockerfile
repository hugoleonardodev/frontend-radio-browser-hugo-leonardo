# Etapa 1: Compilar a aplicação
FROM node:18-alpine AS builder

WORKDIR /src

COPY package*.json *.config.js ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18-alpine

WORKDIR /src

COPY --from=builder /src ./

EXPOSE 3000
CMD ["npm", "start"]
