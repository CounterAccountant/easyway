import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import MessagesPage from './modules/messages/MessagesPage';
import { getLoggedIn, getUser } from './modules/user/UserReducer';
import SignUp from './modules/user/SignUp';

function App() {
    const isLoggedIn = useSelector(getLoggedIn);
    const user = useSelector(getUser)
    return (
        <div className="App">
            {
                isLoggedIn === true && user !== undefined ?
                    <MessagesPage />

                    :
                    <SignUp />

            }
        </div>
    );
}

export default App;
