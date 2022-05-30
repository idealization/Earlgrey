import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../../css/landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foot from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';

function LandingPage(props) {

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        axios.get('/api/items/list/all', {}).then((response) => {
            if (response.data.success) {
            } else {
                alert('사진 목록을 불러오는 데 실패했습니다.');
            }
            for (var i = 0; i < response.data.list.length; i++) {
                var usertemp = (' ' + response.data.list[i]["userFrom"]).slice(1);
                var datetemp = (' ' + response.data.list[i]["createdAt"]).slice(1);
                var idtemp = (' ' + response.data.list[i]["_id"]).slice(1);
                var temp = (usertemp+'_'+datetemp).replace(/:/g,"")+'.png'+'?'+idtemp;
                setItemList(list => [...list, temp]);
            }
        });
    }, []);

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
                            <div>
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
