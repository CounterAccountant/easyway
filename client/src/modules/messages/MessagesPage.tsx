import React, { FunctionComponent, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useDispatch } from 'react-redux';
import { addMessage, getCurrentMessage, postMessageToServer, setCurrentMessage } from "./MessagesReducer";
import Messages from "./Messages";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import { useSelector } from 'react-redux';

const ENDPOINT = "http://localhost:10003";


const MesssagesPage: FunctionComponent = () => {
    const dispatch = useDispatch()
    const message = useSelector(getCurrentMessage)
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.connect()
        socket.on('connect', () => {
            console.log('Successfully connected to socket.io!');
        });
        socket.on('message', (data: any) => {
            dispatch(addMessage(data))
        })
    }, [dispatch]);
    return (
        <div>
            <Messages />
            <FormControl>
                <InputLabel htmlFor="message-input">Type your message</InputLabel>
                <Input
                    id="message-input"
                    aria-describedby="message"
                    value={message}
                    onChange={(ev) => {
                        dispatch(setCurrentMessage(ev.target.value))
                    }}
                />
                <Button color='primary' onClick={() => {
                    dispatch(postMessageToServer)
                }}>Submit</Button>



            </FormControl>
        </div>
    )
}

export default MesssagesPage;