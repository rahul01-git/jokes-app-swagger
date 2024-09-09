FROM node:20-alpine

RUN useradd -ms /bin/bash nodeuser

WORKDIR /user/src/app

COPY . .

RUN npm install

EXPOSE 8000

USER nodeuser

CMD [ "node", "index.js" ]
