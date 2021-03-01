import { IGetMessagesResponse, IPostMessageResponse, IController, ILoginResponse } from "easyway-types";
import express, { NextFunction, Response, Request } from "express";
import userModel from "../user/user.model";
import MessageModel from "./messages.model";
import { io } from '../server';

// var upload = multer({ dest: 'uploads/' })


export default class MessageController implements IController {
    public path = '/messages';
    public router = express.Router();
    private Message = MessageModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            this.getMessages
        );
        this.router.post(
            `${this.path}`,
            this.postMessage
        );
    }

    private getMessages = async (req: Request, res: Response, next: NextFunction) => {
        let messages = await this.Message.find();
        let response: IGetMessagesResponse = { success: true, messages }
        res.json(response);
    }

    private postMessage = async (req: Request, res: Response, next: NextFunction) => {
        const messageToCreate = {
            sender: req.body.sender_id,
            message: req.body.message,
        };
        await this.Message.create(messageToCreate);
        io.to('default_room').emit('message',messageToCreate)
        let response: IPostMessageResponse = { success: true }
        res.json(response);
    }




}