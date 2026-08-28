FROM node:22-alpine

WORKDIR /app

COPY front_web/package*.json ./

RUN npm install

COPY front_web/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]