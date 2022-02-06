FROM node:14

WORKDIR /usr/scr/app

ENV PORT 3000
ENV HOST 0.0.0.0

COPY package.json ./
RUN npm install --production

COPY . .
EXPOSE 3000

CMD npm run start