FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
RUN npm prune --production

RUN npm install -g serve
EXPOSE 5173

CMD ["serve","-s","dist","-l","5173","--single"]
