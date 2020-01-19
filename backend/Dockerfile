FROM node:alpine
RUN mkdir app
WORKDIR app
COPY package.json ./
COPY yarn.lock ./
COPY .env.* ./
COPY ./src ./src
RUN yarn install
EXPOSE 8000
CMD ["yarn", "watch"]
