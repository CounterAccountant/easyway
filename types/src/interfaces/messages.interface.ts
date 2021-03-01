import IMongoSchema from './mongo.schema.interface';

interface IMessage extends IMongoSchema {
    sender: string;
    message: string;
}

export default IMessage