import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../../css/landingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foot from '../Footer/Footer';
import Navbar from '../NavBar/NavBar';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

const Item = styled.button`
    outline: none;
    border: outset;
    border-radius: 5px;
    cursor: pointer;
    width: 170px;
    height: 170px;
    margin: 10px;
    display: flex;
    float: left;

    background: #FFFFFF;

    &:hover {
        background: ${lighten(0.05, '#E7F4F8')};
    }
    &:active {
        background: ${darken(0.05, '#E7F4F8')};
    }
`;

function LandingPage(props) {

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        axios.get('/api/minteds/list/', {}).then((response) => {
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

    const onItemHandler = (event, itemId) => {
        event.preventDefault();

        props.history.push({
            pathname: '/report',
            state: {
                itemId: itemId,
                userFrom: localStorage.getItem('userId')
            }
        });
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
                                            사진 찍기
                                        </button>
                                    </span>
                                    <span>
                                        <button className="btn btn-lg btn-default listBtn" onClick={onListClickHandler}>
                                            내 사진 목록
                                        </button>
                                    </span>
                                </p>
                                <br></br>
                                <div className='item-board'>
                                    {itemList.map((imgSource, idx) => (
                                        <form key={idx} onSubmit={(event) => onItemHandler(event, imgSource.split('?')[1])}>
                                            <span>
                                                <Item type="submit" imgSource={imgSource.split('?')[0]}>
                                                    <img id="captured" src={imgSource.split('?')[0]} alt="test-ilustartion" />
                                                </Item>
                                            </span>
                                        </form>
                                    ))}
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
