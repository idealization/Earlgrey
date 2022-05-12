import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../../css/landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foot from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import LandingImg from '../../../img/land2.png'

function LandingPage(props) {

    const onStartClickHandler = () => {
        props.history.push('/run');
    };

    const onListClickHandler = () => {
        props.history.push('/list');
    };

    return (
        <div id="htmlID">
            <div className="bg-primary bg-opacity-25" id="bodyID" >
                <div className="site-wrapper ">
                    <div className="site-wrapper-inner">
                        <div className="cover-container">
                            <Navbar />
                            <div className="inner cover">
                                <span className="title-land">
                                    내 얼굴로 만드는<br/>NFT
                                </span>
                                <span className="title-land-mini">
                                    지금 바로 시작해보세요!
                                </span>
                                <img className="testImg" src={LandingImg}/>
                                <div>
                                    <button className="btn btn-lg btn-default startBtn" onClick={onStartClickHandler}>
                                        시작하기
                                    </button>
                                    <button className="btn btn-lg btn-default listBtn" onClick={onListClickHandler}>
                                        내 사진 목록
                                    </button>
                                </div>
                            </div>
                            <Foot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(LandingPage);
