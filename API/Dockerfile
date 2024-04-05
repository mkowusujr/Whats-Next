FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN yarn
ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "start"]