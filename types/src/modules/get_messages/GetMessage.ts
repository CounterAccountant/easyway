import IMessage from "../../interfaces/messages.interface";

interface IGetMessagesResponse {
    messages: IMessage[];
    success: boolean;
}

export default IGetMessagesResponse;