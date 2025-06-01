FROM node:22
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .
EXPOSE 3001
RUN npm i
CMD [ "node" , "index.js"]