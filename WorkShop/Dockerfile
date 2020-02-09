FROM node:10.13.0-alpine
# Env
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev
ENV MONGO_HOSTNAME=db
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DB=$MONGO_DB
ENV AMQP_URL=amqp://rabbitmq

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
#RUN npm run tsc
# Start
CMD [ "npm", "start" ]
EXPOSE 8080