# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:12.19.0-alpine3.12 as build-stage
WORKDIR /app
COPY fe/package*.json /app/
COPY fe/yarn.lock /app/
RUN yarn install --silent

RUN mkdir -p /be/src/generator
RUN mkdir -p /be/src/resources
COPY ./be/src/generator/ /be/src/generator
COPY ./be/src/resources/ /be/src/resources

COPY ./fe/ /app/

RUN yarn run build-prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/dist/fe/ /usr/share/nginx/html
