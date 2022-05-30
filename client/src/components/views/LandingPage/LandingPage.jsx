import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../../../css/landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foot from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

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
                                <p className="title-land">
                                    내 얼굴로 만드는 NFT
                                </p>
                                <p className="title-land-mini">
                                    지금 바로 시작해보세요!
                                </p>
                                <p>
                                    <span>
                                        <button className="btn btn-lg btn-default startBtn" onClick={onStartClickHandler}>
                                            시작하기
                                        </button>
                                    </span>
                                    <span>
                                        <button className="btn btn-lg btn-default listBtn" onClick={onListClickHandler}>
                                            내 사진 목록
                                        </button>
                                    </span>
                                </p>
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
