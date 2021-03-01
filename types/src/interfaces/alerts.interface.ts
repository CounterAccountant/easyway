import IMongoSchema from './mongo.schema.interface';

export type IConditionPrefix = '>' | '<' | '=';


interface IAlert extends IMongoSchema {
    city: string;
    current_temprature: number;
    condition_prefix: IConditionPrefix;
    condition_temprature: number;
    last_triggered: Date;
    status?: boolean;
    id?: string;
    duration?: string;
    raw_condition?: string;
}

export default IAlert;
