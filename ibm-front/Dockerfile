FROM node:16.14.2-slim as angular-built
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build 

FROM nginx:alpine
LABEL author="Carlos"
COPY --from=angular-built /usr/src/app/dist/front /usr/share/nginx/html
EXPOSE 80