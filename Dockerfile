FROM node:alpine

WORKDIR /server
COPY . .

RUN yarn
CMD ["node", "index"]
