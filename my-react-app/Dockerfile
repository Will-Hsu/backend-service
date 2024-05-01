FROM node:alpine
WORKDIR '/app'
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --openssl-legacy-provider

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html