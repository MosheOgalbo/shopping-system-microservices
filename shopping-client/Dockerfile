FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_API_PRODUCTS=http://localhost:5177/api/
ARG VITE_API_ORDERS=http://localhost:5001/api/
ENV VITE_API_PRODUCTS=$VITE_API_PRODUCTS
ENV VITE_API_ORDERS=$VITE_API_ORDERS
RUN npm run build

FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve && addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/dist ./dist
USER app
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
