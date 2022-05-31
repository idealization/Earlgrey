import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import '../../../css/landingPage.css';
import "../../../css/LoginPage.css";

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        };

        dispatch(registerUser(body)).then((response) => {
            if (response.payload.success) {
                props.history.push('/login');
            } else {
                alert('Failed to sign up');
            }
        });
    };

    return (
        <body>
            <div
                className="bg-primary bg-opacity-25"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh'
                }}
            >
                <div className="site-wrapper ">
                    <div className="site-wrapper-inner">
                        <div className="cover-container">
                            <Navbar/>
                            <div className="inner cover group-2 overlap-group2">
                                <form style={{ margin: 'auto', display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                                    <p style={{ margin: 'auto', width: '300px' }}>
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">이메일</label>
                                        <input type="email" className="form-control" value={Email} onChange={onEmailHandler} />
                                    </p>
                                    <p style={{ margin: 'auto', width: '300px' }}>
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">이름</label>
                                        <input type="text" className="form-control" value={Name} onChange={onNameHandler} />
                                    </p>
                                    <p style={{ margin: 'auto', width: '300px' }}>
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">비밀번호</label>
                                        <input type="password" className="form-control" value={Password} onChange={onPasswordHandler} />
                                    </p>
                                    <p style={{ margin: 'auto', width: '300px' }}>
                                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">비밀번호 확인</label>
                                        <input type="password" className="form-control" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                                    </p>
                                    <br />
                                    <button style={{ margin: 'auto', width: '300px' }} type="submit" className="btn regbtn">S i g n    U p</button>
                                </form>
                            </div>

                        </div>
                        <div className="loginx2022-cau-capstone-design-_-cft">@ 2022 CAU capstone design _ CFT</div>
                    </div>

                </div>

            </div>
        </body>
    );
}

export default withRouter(RegisterPage);