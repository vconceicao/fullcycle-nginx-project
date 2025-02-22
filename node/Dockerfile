FROM node:15

WORKDIR   /usr/src/app

COPY . .

RUN npm install express --save && \
    npm install mysql --save


EXPOSE 3000

CMD ["node", "index.js"]
