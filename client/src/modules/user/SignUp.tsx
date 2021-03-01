import { Button, FormHelperText, Grid, Input, InputLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import { getSignupFormAlert, loginToChat, setUsernameInSignup } from "./UserReducer";
import MuiAlert from '@material-ui/lab/Alert';
import { getMessagesFromServer } from "../messages/MessagesReducer";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
    },
    heading: {
        marginBottom: 50,
    }
}));


const SignUp: FunctionComponent = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const signupAlert = useSelector(getSignupFormAlert)
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>
                    <Typography className={classes.heading} variant='h5'>Please enter a username</Typography>

                    <FormControl>
                        <InputLabel htmlFor="username-input">Username</InputLabel>
                        <Input
                            id="username-input"
                            aria-describedby="username"
                            onChange={(ev) => {
                                dispatch(setUsernameInSignup(ev.target.value))
                            }}
                        />
                        <FormHelperText id="username">Please insert a username</FormHelperText>
                        <Button color='primary' onClick={() => {
                            dispatch(loginToChat)
                            dispatch(getMessagesFromServer)
                        }}>Go to chat</Button>

                        {
                            signupAlert &&
                            <MuiAlert elevation={6} variant="filled" severity='error'>{signupAlert}</MuiAlert>
                        }

                    </FormControl>
                </Grid>

            </Grid>
        </div>
    )
}

export default SignUp;