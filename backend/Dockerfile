FROM node:alpine
RUN mkdir app
WORKDIR app
COPY package.json ./
COPY yarn.lock ./
COPY .env.development ./
COPY ./src ./src
RUN yarn install
ENV VINCIT_SUMMER_2020_DEV=true
EXPOSE 8000
CMD ["yarn", "watch"]
