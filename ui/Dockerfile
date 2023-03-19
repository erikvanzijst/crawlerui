FROM node:16-alpine

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD npm start
