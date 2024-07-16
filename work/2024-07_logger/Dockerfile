FROM node:20.10.0-slim

WORKDIR /app

COPY . .

RUN corepack enable && \
  corepack prepare yarn@stable --activate && \
  yarn set version 4.1.0 && \
  yarn install --network-timeout 600000

RUN yarn build

ENV PORT 4000
EXPOSE 4000
CMD [ "yarn", "start" ]