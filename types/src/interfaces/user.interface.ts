import IMongoSchema from './mongo.schema.interface';

interface IUser extends IMongoSchema {
    username: string;
}

export default IUser;