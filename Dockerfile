FROM node:10.16.2

ADD . /var/app
WORKDIR /var/app

RUN rm -rf node_modules
RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]

