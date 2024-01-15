FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 27017

CMD ["yarn", "start"]
