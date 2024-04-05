FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN yarn global add serve
RUN yarn

ARG VITE_API_URI
ENV VITE_API_URI=${VITE_API_URI}
ENV NODE_ENV=production
RUN yarn build

EXPOSE 3001

CMD ["yarn", "serve"]