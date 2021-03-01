import { AnyAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IGetMessagesResponse, IPostMessageRequest } from "easyway-types";
import { RootState } from "../../store";
import Request from "../../services/axios.service";


interface MessagesState {
    messages: IMessage[];
    current_message: string;
}

const initialState: MessagesState = {
    messages: [],
    current_message: '',
};

export const MessagesSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {
        setMessages: (state: MessagesState, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
        setCurrentMessage: (state: MessagesState, action: PayloadAction<string>) => {
            state.current_message = action.payload;
        },
        addMessage: (state: MessagesState, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload)
        }
    },
});

export const { setMessages, setCurrentMessage, addMessage } = MessagesSlice.actions;


export const getMessages = (state: RootState): IMessage[] => state.messages.messages;
export const getCurrentMessage = (state: RootState): string => state.messages.current_message;



export const getMessagesFromServer = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const messagesData = await Request<IGetMessagesResponse>({
        url: 'messages',
        method: 'GET',
    });
    if (messagesData.data && messagesData.data.success && messagesData.data.messages) {
        dispatch(setMessages(messagesData.data.messages));
    } else {
        console.log('Error in getting messages', messagesData);

    }
}

export const postMessageToServer = async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (state.user.user) {
        const body: IPostMessageRequest = {
            sender_id: state.user.user.username,
            message: state.messages.current_message
        }
        const messagesData = await Request<IGetMessagesResponse>({
            url: 'messages',
            method: 'POST',
            data: body
        });
        if (messagesData.data && messagesData.data.success) {
            // dispatch(setMessages(messagesData.data.messages));
        } else {
            console.log('Error in posting messages', messagesData);

        }
    }
}




export default MessagesSlice.reducer;

