import { IController, ILoginResponse } from "easyway-types";
import express, { NextFunction, Response, Request } from "express";
import UserModel from "./user.model";
// var upload = multer({ dest: 'uploads/' })


export default class UserController implements IController {
    public path = '/user';
    public router = express.Router();
    private User = UserModel;
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/signup`,
            this.signup
        );


    }

    private signup = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.username || req.body.username === '') {
            return res.json({ success: false, message: 'Please submit username' })
        }
        let user = await this.User.findOne({ username: req.body.username });
        if (!user) {
            user = await this.User.create({ username: req.body.username })
        }
        let response: ILoginResponse = { success: true, user }
        res.json(response);
    }




}