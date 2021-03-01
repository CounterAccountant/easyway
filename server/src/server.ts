import 'dotenv/config';
import App from './app';

import validateEnv from './utils/validateEnv';
import UserController from './user/user.controller';
import MessagesController from "./messages/messages.controller";

validateEnv();

const app = new App(
    [
        new UserController(),
        new MessagesController(),
    ],
);

const server = app.listen();

export const io = require("socket.io")(app.httpServer, {
    cors: {
        origin: "http://localhost:9091",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('Connected to client');
    socket.join('default_room')
});

