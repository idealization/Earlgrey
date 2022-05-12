import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

function RegisterPage(props) {
    const [Nickname, setNickname] = useState('');

    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            nickname: Nickname,
            firebaseId: props.location.state.firebaseId
        };

        axios.post('/api/users/register', body).then((response) => {
            console.log(body, response.data);
            if (response.data.success) {
                localStorage.setItem('userId', response.data.user._id);
                props.history.push('/');
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
                    height: '100vh',
                }}
            >
                <Navbar/>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                    <div className="row pdB">
                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">닉네임</label>
                        <input type="text" className="form-control" value={Nickname} onChange={onNicknameHandler} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">회원 가입</button>
                </form>
            </div>
        </body>
    );
}

export default withRouter(RegisterPage);
