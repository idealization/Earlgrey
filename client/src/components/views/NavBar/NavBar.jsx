import React, { useState, useEffect } from "react";
import logo from '../../../img/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/Navi.css'
import { withRouter } from 'react-router-dom';
import { authService, firebaseInstance } from '../../../fBase';

function Navbar(props) {
    const [isLogin, setIsLogin] = useState(false);
    const user = authService.currentUser;

    useEffect(() => {
        if (!user) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [])

    const onHomeClickHandler = () => {
        props.history.push('/');
    };

    const onLoginClickHandler = async () => {
        if (isLogin) {
            authService.signOut().then(() => {
                setIsLogin(false);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            props.history.push('/login');
        }
    };

    return (
        <div className="masthead clearfix">
            <div className="inner">
                {/* <h3 class="masthead-brand">Cover</h3> */}
                <div className="logo masthead-brand">
                    <img src={logo} className="logoImg" onClick={onHomeClickHandler} role="button" />
                </div>
                <nav>
                    <ul className="nav masthead-nav">
                        <li className="active">
                            <button className="fs-3 li-a" id="list-3" onClick={onLoginClickHandler} style={{color:'black'}}>
                                {isLogin ? '로그아웃' : '로그인   '}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default withRouter(Navbar);
