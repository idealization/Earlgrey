import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import { authService, firebaseInstance } from '../../../fBase';
import googleLogin from '../../../img/btn_google_signin_light_normal_web.png'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onRegisterClickHandler = () => {
        props.history.push('/register');
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password,
        };

        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                localStorage.setItem('userId', response.payload.userId);
                props.history.push('/');
            } else {
                alert('Error');
            }
        });
    };

    const onLoginClickHandler = async () => {
        const provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
        console.log(data);

        const body = {
            firebaseId: data.uid
        }
        
        axios.post('/api/users/login/google', body).then((response) => {
            console.log(response.data);
            if (response.data.loginSuccess) {
                console.log("login success");
                localStorage.setItem('userId', response.data.user._id);
                props.history.push('/');
            } else {
                props.history.push({
                    pathname: '/google-register',
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
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                    <div className="row pdB">
                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">이메일</label>
                        <input type="email" className="form-control" value={Email} onChange={onEmailHandler} />
                    </div>
                    <div className="row">
                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">비밀번호</label>
                        <input type="password" className="form-control" value={Password} onChange={onPasswordHandler} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">로그인</button>
                    <button className="btn btn-primary" onClick={onRegisterClickHandler}>회원가입</button>
                    <img src={googleLogin} onClick={onLoginClickHandler} role="button" />
                </form>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);
