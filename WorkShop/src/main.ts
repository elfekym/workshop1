import { app } from './app';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as Amqp from "amqp-ts";

var connection = new Amqp.Connection("amqp://localhost");
var exchange = connection.declareExchange("ExchangeName");
var queue = connection.declareQueue("ItemChanged");
queue.bind(exchange);

const port = 8080;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
  console.error(err);
});
const MONGO_URI = 'mongodb://localhost:27017/item';
server.on('listening', async () => {
    console.info(`Listening on port ${port}`);
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
        console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
        console.error('Unable to connect to Mongo via Mongoose', err);
    });

    connection.completeConfiguration().then(() => {
        // the following message will be received because
        // everything you defined earlier for this connection now exists
        var msg2 = new Amqp.Message("Test2");
        exchange.send(msg2);
    });
});