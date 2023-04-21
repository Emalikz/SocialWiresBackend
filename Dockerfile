FROM node:18.13.0

ENV NODEDIR=/nodeapp

RUN mkdir $NODEDIR

RUN npm install nodemon -g

WORKDIR $NODEDIR

COPY package.json $NODEDIR/
RUN npm install

COPY . $NODEDIR/

CMD ["npm", "start"]
