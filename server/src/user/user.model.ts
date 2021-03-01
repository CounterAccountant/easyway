import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from "easyway-types";
import timeStamps from '../services/timestamps';



export type IUserWithMethods = IUser & Document & {
}


export interface IUserModel extends Model<IUserWithMethods> {

}



const UsersSchema = new Schema({
    username: { type: String, required: true },
}, timeStamps);


export default mongoose.model<IUserWithMethods, IUserModel>('users', UsersSchema);

