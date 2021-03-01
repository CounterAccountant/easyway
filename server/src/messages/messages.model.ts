import mongoose, { Schema, Document, Model } from 'mongoose';
import { IMessage } from "easyway-types";
import timeStamps from '../services/timestamps';



export type IMessageWithMethods = IMessage & Document & {
}


export interface IMessageModel extends Model<IMessageWithMethods> {

}



const MessagesSchema = new Schema({
    sender: { type: String, required: true },
    message: { type: String },
}, timeStamps);


export default mongoose.model<IMessageWithMethods, IMessageModel>('messages', MessagesSchema);

