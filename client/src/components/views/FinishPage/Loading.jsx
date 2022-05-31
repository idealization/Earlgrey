import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import logo from '../../../img/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

function Loading(props){
    const [progress, setProgress] = useState(0);

    function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }
    useEffect(() => {
        setInterval(() => {setProgress(progress => progress + 3)}, 1000);
        sleep(2000)
            .then(() => {
                axios.post('/api/images/', {
                    userFrom: props.location.state.userFrom,
                    createdAt: props.location.state.createdAt,
                });
            })
            .then(() =>
                sleep(30000).then(() =>
                    props.history.push({
                        pathname: '/finish',
                        state: {
                            userFrom: props.location.state.userFrom,
                            createdAt: props.location.state.createdAt,
                        }
                    })
                )
            );
    },[])

    return (
        <div className='report'>
            <div className="simpleNavi" style={{marginLeft:'2vw'}}>
                <img src={logo} alt="logo" />
            </div>
            <div className="justify-content-center">
                <div style={{width:'100%'}}>
                    <div style={{margin:'0 37%'}}>
                        <span style={{marginLeft:'2rem',fontSize: '30px',fontWeight: '250',fontFamily: 'HSYuji-Regular',color: 'black'}}>잠시만 기다려주세요.</span>
                    </div>
                    <p>
                        <LinearProgress style={{width:'1000px', height: '1rem', margin: 'auto'}} variant="determinate" value={progress} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Loading);