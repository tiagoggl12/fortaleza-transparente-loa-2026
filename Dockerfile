# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config as template: a imagem oficial roda envsubst nos
# arquivos de /etc/nginx/templates/ e gera /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Porta padrão (Railway injeta PORT dinamicamente)
ENV PORT=80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
