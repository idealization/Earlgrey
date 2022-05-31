import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import '../../../css/landingPage.css';
import { authService, firebaseInstance } from '../../../fBase';
import googleLogin from '../../../img/btn_google_signin_light_normal_web.png'
import "../../../css/LoginPage.css";

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
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                    <div className="cover-container">
                            <Navbar/>
                            <div className="inner cover">
                                <div className="group-2 overlap-group2">
                                <form style={{ margin: 'auto', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={onSubmitHandler}>
                                    <p style={{ margin: 'auto', width: '300px' }}>
                                        <div className="logininput">
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">이메일</label>
                                        <input type="email" className="form-control" value={Email} onChange={onEmailHandler} />
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">비밀번호</label>
                                        <input type="password" className="form-control" value={Password} onChange={onPasswordHandler} />
                                        </div>
                                    </p>
                                    <p style={{ margin: 'auto' }}>
                                        <button type="submit" className="btn big-button-primary">
                                            <div className="l-o-g-i-n">
                                            L O G  I N</div>
                                        </button>
                                        {/*<button style={{ margin: '10px' }} type="submit" className="btn btn-lg btn-default">로그인</button>*/}
                                        {/*<button style={{ margin: '10px' }} className="btn btn-lg btn-default" onClick={onRegisterClickHandler}>회원가입</button>*/}
                                    </p>
                                    <div className="loginflex-row roboto-medium-black-18px">
                                        <div className="new-here">New here ?</div>
                                        <button className="btn sign-up" onClick={onRegisterClickHandler}>Sign Up</button>
                                        {/*<button style={{ margin: '10px' }} className="btn btn-lg btn-default" onClick={onRegisterClickHandler}>회원가입</button>*/}
                                        <img
                                            className="line-6-1"
                                            src="https://anima-uploads.s3.amazonaws.com/projects/62580abadea5348a3498e2ab/releases/6295499290a91e67e20458ad/img/line-6@2x.svg"
                                        />
                                        <div className="google">
                    <img
                        className="logo-googleg-48dp"
                        src="https://anima-uploads.s3.amazonaws.com/projects/62580abadea5348a3498e2ab/releases/6295499290a91e67e20458ad/img/logo-googleg-48dp@2x.svg"
                    />
                    <div className="continue-with-google roboto-medium-black-18px" onClick={onLoginClickHandler} role="button">Continue with Google</div>
              </div>
                                    </div>
                                </form></div>
                                <div className="loginx2022-cau-capstone-design-_-cft">@ 2022 CAU capstone design _ CFT</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);
