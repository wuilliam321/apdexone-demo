FROM node:17.9.0
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
CMD ["node", "./dist/index.js"]
