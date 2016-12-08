FROM node:argon

RUN mkdir /app
COPY package.json /app
WORKDIR /app
RUN npm install -g nodemon
RUN npm install --production
COPY . /app/
CMD ["npm", "start"]