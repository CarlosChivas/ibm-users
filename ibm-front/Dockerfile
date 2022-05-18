FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install 
#RUN npm run build --prod

FROM nginx:alpine
CMD ["ng", "serve","--proxy-config","proxy.conf.json"]
#COPY --from=node /app/dist/front /usr/share/nginx/html