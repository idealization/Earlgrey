import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';

function GoogleRegisterPage(props) {
    const [Name, setName] = useState('');

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            name: Name,
            firebaseId: props.location.state.firebaseId
        };

        axios.post('/api/users/register/google', body).then((response) => {
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
                        <input type="text" className="form-control" value={Name} onChange={onNameHandler} />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">회원 가입</button>
                </form>
            </div>
        </body>
    );
}

export default withRouter(GoogleRegisterPage);
