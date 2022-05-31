/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import logo from '../../../img/logo.png';
import { withRouter } from 'react-router-dom';
import '../../../css/Run.css';
import { useSpring, config, animated } from 'react-spring';
import Webcam from "react-webcam";
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import 'moment-timezone';
import moment from 'moment';
const download = require('image-downloader')

const CONSTRAINTS = { video: true };
const ShowButton = styled(animated.button)`
    outline: none;
    border: none;
    border-radius: 10px;
    color: white;
    width: 300px;
    padding: 2rem;
    height: 30%;
    margin: 0 auto;
    font-size: 30px;
    cursor: pointer;
    font-family: 'CookieRunOTF-Bold';

    /* 색상 */
    background: #E3C04D;
    &:hover {
        background: ${lighten(0.1, '#E3C04D')};
    }
    &:active {
        background: ${darken(0.1, '#E3C04D')};
    }
`;
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

const videoConstraints = {
    facingMode: "user"
};

function Run(props) {
    const figures = React.useRef();
    const camera = React.useRef();
    const webcamRef = React.useRef(null);
    const webcamElement = camera.current;

    const [isToggle, setToggle] = useState(null);
    const [btnVisible, setBtn] = useState(true);
    const [image, setImage] = useState(undefined);
    console.log("btn", btnVisible);
    console.log("img", image);
    console.log("render");
    
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
    }, [webcamRef]);
    
    const appearSlothText = useSpring({
        config: config.stiff,
        x: 130,
        opacity: isToggle ? 1 : 0,
        y: -200,
    });

    const { x } = useSpring({
        loop: true,
        from: { x: 0 },
        to: { x: 1 },
        config: { duration: 2000 },
    });

    const run = async () => {
        const model = await blazeface.load();

        const webcam = await tf.data.webcam(webcamElement, {
            resizeWidth: 220,
            resizeHeight: 227,
        });

        const predict = async () => {
            while (true) {
                try {
                    let check = false;
                    const img = await webcam.capture();
                    const predictions = await model.estimateFaces(img, false);

                    for (let i = 0; i < predictions.length; i++) {
                        if (figures.current) {
                            check = true;
                        }
                    }

                    if (figures.current && !check) {
                        if (!isToggle) {
                            setToggle((isToggle) => true);
                        }
                        figures.current.innerText = '         얼굴을 보여주세요.         ';
                    }

                    if (figures.current && check) {
                        setToggle((isToggle) => false);
                    }

                    img.dispose();
                    await tf.nextFrame();
                } catch (e) {
                    console.error(e);
                    continue;
                }
            }
        };
        predict();
    };

    const startVideo = async () => {
        setBtn(false);

        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        if (camera && camera.current && !camera.current.srcObject) {
            camera.current.srcObject = stream;
        }

        run();
    };

    const onHomeClickHandler = () => {
        props.history.push('/');
    };

    const selectPicture = () => {
        const userFrom = localStorage.getItem('userId');
        moment().tz("Asia/Seoul");
        var curr = moment().format('YYYY-MM-DD HH:mm:ss');
        var a = document.createElement("a"); //Create <a>
        a.href = image; //Image Base64 Goes here
        a.download = "base_image"
        // a.download = `${userFrom}_${curr}`; //File name Here
        a.click(); //Downloaded file
        props.history.push({
            pathname: '/loading',
            state: {
                userFrom: userFrom,
                createdAt: curr,
            }
        });
    };

    return (
        <div className="run">
            <div className="simpleNavi">
                <img src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>

            <div className="face">
                <div style={{height:'200px'}}>
                    <div className="question" id="run_question">
                        <h2>내 얼굴로 NFT 만들기</h2>
                    </div>
                </div>
                <div id="FD">
                    {btnVisible ? (
                        <ShowButton
                            id="btn"
                            style={{
                                scale: x.to({
                                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                                }),
                            }}
                            onClick={() => {
                                startVideo();
                            }}
                        >
                            촬영 시작하기
                        </ShowButton>
                    ) : (
                        <div className="facedetector">
                            {!image ? (
                                <div>
                                    <Webcam
                                        id="webcam"
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={videoConstraints}
                                    />
                                    <video id="camera" autoPlay muted={true} ref={camera} />
                                </div>
                            ) : (
                                <div id="capdiv">
                                    <img id="captured" src={image} alt="test-ilustartion" />
                                </div>
                            )}
                            <animated.div className="text" id="sloth-text" ref={figures} style={appearSlothText} />
                            <br />
                            <div className="stopButton">
                                <button id="btnCapture" onClick={() => (!image ? capture() : setImage(undefined))}>
                                    {!image ? "사진 찍기" : "다시 찍기"}
                                </button>
                                {image && 
                                    <SelectButton
                                        style={{
                                            scale: x.to({
                                                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                                            }),
                                        }}
                                        onClick={() => {
                                            selectPicture();
                                        }}
                                    >
                                        결정하기
                                    </SelectButton>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withRouter(Run);
