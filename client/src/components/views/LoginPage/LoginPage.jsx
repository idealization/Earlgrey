import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import { authService, firebaseInstance } from '../../../fBase';
import googleLogin from '../../../img/btn_google_signin_light_normal_web.png'

function LoginPage(props) {

    const onLoginClickHandler = async () => {
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
        console.log(data);

        const body = {
            firebaseId: data.uid
        }
        
        axios.post('/api/users/login', body).then((response) => {
            console.log(response.data);
            if (response.data.loginSuccess) {
                console.log("login success");
                localStorage.setItem('userId', response.data.user._id);
                props.history.push('/');
            } else {
                props.history.push({
                    pathname: '/register',
                    state: {
                        firebaseId: data.uid
                    }
                });
            }
        });
    };

    return (
        <div>
            <div
                className="bg-primary bg-opacity-25"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Navbar/>
                    <div className="row pdB">
                        <img src={googleLogin} onClick={onLoginClickHandler} role="button" />
                    </div>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);
