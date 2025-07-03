FROM node:18

WORKDIR /app
COPY . .
RUN npm install

RUN npm install -g serve

RUN npm run build


CMD ["serve", "-s", "dist", "-l", "5000"]
