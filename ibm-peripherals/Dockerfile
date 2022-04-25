FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV DATABASE_STRING DATABASE=bludb;HOSTNAME=98538591-7217-4024-b027-8baa776ffad1.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=30875;PROTOCOL=TCPIP;UID=zlc02632;PWD=rSz4T3b3ZuhDy8yw;Security=SSL
ENV JWT_SECRETKEY carlos123
COPY . .

CMD ["npm", "start"]