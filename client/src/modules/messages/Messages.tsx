import { FunctionComponent, useEffect } from "react";
import { useSelector } from 'react-redux';
import { getMessages } from './MessagesReducer';
import { makeStyles, Theme, Typography } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
    },
    inline: {
        display: 'inline'
    }
}));


const Messages: FunctionComponent = () => {
    const classes = useStyles();
    const messages = useSelector(getMessages)
    return (
        <div>
            {
                messages &&
                messages.map((message, i) => {
                    return (
                        <div key={i}>
                            <Typography className={classes.inline}>{moment(message.created_at).format('YYYY/MM/DD HH:mm')}</Typography>
                            <Typography className={classes.inline}> : </Typography>
                            <Typography className={classes.inline}>{message.sender}</Typography>
                            <Typography className={classes.inline}> : </Typography>
                            <Typography className={classes.inline}>{message.message}</Typography>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Messages;