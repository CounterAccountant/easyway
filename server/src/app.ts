
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { IController } from 'easyway-types';
import * as http from "http";
import * as socketio from 'socket.io';
import ioserver, { Socket } from 'socket.io';
import socketIOClient from "socket.io-client";

const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Set-Cookie",
        "Authorization",
        "cookies",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Credentials",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: [
        'http://localhost:9091/',
        'http://localhost:10004/',
        'https://web-prod',
    ],
    preflightContinue: true
};

class App {
    public app: express.Application;
    public httpServer: http.Server;
    public io: socketio.Server;
    
    constructor(controllers: IController[]) {
        this.app = express();
        // this.listen();
        // const socketIo = require("socket.io");
        // const server = socketio(this.app.get('port'));
        // const io = socketIo(server);

        // io.on("connection", (socket) => {
        //     console.log("New client connected", socket);

        // });
        // const io = socketIOClient.connect('http://localhost:10003');
        // const io = require("socket.io")(3000);

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeSocketIo();
    }

    public listen() {
        this.httpServer = this.app.listen(process.env.SERVER_PORT, () => {
            console.log(`App listening on the port ${process.env.SERVER_PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }
    
    public getHttpServer() {
        return this.httpServer;
    }

    private initializeMiddlewares() {
        this.app.use(morgan('tiny'));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }


    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use(
                '/',
                controller.router
            );
        });
    }

    private async connectToTheDatabase() {
        try {
            const connection = await mongoose.connect(`${process.env.MONGO_PATH}/easyway`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
            // const geoData = await getGeoCodingData('Santiago de Cali, CO');
            // // console.log('geoData is: ', geoData.geometry.location);
            // const weatherData = await getWeatherData(geoData.geometry.location.lat,geoData.geometry.location.lng);
            // console.log('weatherData is: ', weatherData.currently.temperature);
        } catch (error) {
            console.log('error when trying to connect to mongose is: ', error);
        }
    }

    private initializeSocketIo() {
        // this.httpServer = new http.Server(this.app);
        // this.io = require('socket.io')(this.httpServer)
        // this.io.on("connection", function (socket: any) {
        //     console.log("a user connected");
        // });

    }
}

export default App;
