FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

# התקן את כל התלויות כולל dev
RUN npm ci

# עותק הקוד
COPY . .

# הרץ build
RUN npm run build

# התקן מחדש רק prod-dependencies למינימליזציה
RUN npm prune --production

EXPOSE 5000
ENV NODE_ENV=production
ENV PORT=5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["node", "dist/index.js"]
