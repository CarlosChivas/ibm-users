FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV DATABASE_STRING DATABASE=bludb;HOSTNAME=2f3279a5-73d1-4859-88f0-a6c3e6b4b907.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=30756;PROTOCOL=TCPIP;UID=szg02442;PWD=xIRGnwrUBpJxLXyT;Security=SSL
ENV JWT_SECRETKEY carlos123
COPY . .

CMD ["npm", "start"]