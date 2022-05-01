FROM node:17.9.0 as base
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
FROM base
RUN yarn build
CMD ["node", "./dist/index.js"]
