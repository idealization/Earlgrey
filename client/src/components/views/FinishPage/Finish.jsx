import React, { useState, useEffect } from "react";
import { useSpring, config, animated } from 'react-spring';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import axios from 'axios';
import logo from '../../../img/logo.png'
import '../../../css/Report.css'
import { withRouter } from 'react-router-dom';

const SelectButton = styled(animated.button)`
    cursor: pointer;
    margin-left: 10px;
    color: black;
    width: 120px;
    height: 60px;
    border: none;
    font-size: 2rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'CookieRunOTF-Bold';

    /* 색상 */
    background: #D3C9B5;
    &:hover {
        background: ${lighten(0.1, '#D3C9B5')};
    }
    &:active {
        background: ${darken(0.1, '#D3C9B5')};
    }
`;

function Finish(props) {
    const { x } = useSpring({
        loop: true,
        from: { x: 0 },
        to: { x: 1 },
        config: { duration: 2000 },
    });

    const onSubmitHandler = (event) => {
        axios.post('/api/items/', {
            userFrom: props.location.state.userFrom,
            createdAt: props.location.state.createdAt,
        }).then((response) => {
            if (response.data.success) {
                props.history.push('/');
            } else {
                alert('실패했습니다.');
            }
        });
    };

    const onHomeClickHandler = () => {
        props.history.push('/');
    };
    
    const onRunClickHandler = () => {
        props.history.push('/run');
    };

    return (
        <div className='report'>
            <div className="simpleNavi">
                <img src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>
            <div className='body'>
                <div style={{height:'200px'}}>
                    <div className="question" id="run_question">
                        <h2>모델 결과</h2>
                    </div>
                </div>
                <div className='content' id="finish_ctn">
                    <div id="itemdiv">
                        <img id="item" src="cartoon_image.png" alt="test-ilustartion" />
                    </div>
                    <div className="stopButton">
                        <button id="btnCapture" onClick={onRunClickHandler}>
                            {"다시 찍기"}
                        </button>
                        <SelectButton
                            style={{
                                scale: x.to({
                                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                                }),
                            }}
                            onClick={onSubmitHandler}
                        >
                            저장하기
                        </SelectButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Finish);