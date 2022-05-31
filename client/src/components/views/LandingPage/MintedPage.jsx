import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../../../img/logo.png'
import '../../../css/Report.css'
import { withRouter } from 'react-router-dom';
import 'moment-timezone';
import moment from 'moment';

function Report(props){
    const [userFrom, setUserFrom] = useState();
    const [createdUser, setCreatedUser] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [mintedUser, setMintedUser] = useState();
    const [mintedAt, setMintedAt] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const itemId = props.location.state.itemId;
        const userFrom = props.location.state.userFrom;
        
        axios.get('/api/minteds/', {
            params: {
                _id: itemId
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('발표 태도 분석을 불러오는 데 실패했습니다.');
            }
            setUserFrom(userFrom);
            setCreatedUser(response.data.createdUser);
            setCreatedAt(response.data.createdAt);
            setMintedUser(response.data.mintedUser);
            setMintedAt(response.data.mintedAt);
            setTitle(response.data.title);
            setContent(response.data.content);
        });
    }, []);

    const onHomeClickHandler = (event) => {
        event.preventDefault();
        props.history.push('/');
    };

    const onBuyingClickHandler = (event) => {
        event.preventDefault();

        axios.post('/api/minteds/item', {
            _id: props.location.state.itemId,
        }).then((response) => {
            if (response.data.success) {
                props.history.push('/');
            } else {
                alert('실패했습니다.');
            }
        });
    };

    return (
        <div className='report'>
            <div className="simpleNavi">
                <img style={{marginLeft:'2vw'}} src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>
            <div className="list_board">
                <div className="question">
                    <h1 className="title">제목: {title}</h1>
                </div>
                <p>
                    <img id="captured" src={(userFrom+'_'+createdAt).replace(/:/g,"")+'.png'} alt="test-ilustartion" />
                </p>
                <p className='box' id='box1' style={{position: 'fixed', top: '400px', marginLeft: '65px'}}>
                    <span className='mini-title'>내용: {content}</span>
                    <span className='mini-title'>사진을 찍은 사람: {createdUser}</span>
                    <span className='mini-title'>사진을 찍은 날짜: {createdAt}</span>
                    <span className='mini-title'>NFT를 발행한 사람: {mintedUser}</span>
                    <span className='mini-title'>NFT를 발행한 날짜: {mintedAt}</span>
                </p>
                <div className="stopButton" id="end">
                    <form style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', margin: 'auto' }}>
                        <button type="submit" onClick={onHomeClickHandler} id="btnCapture" style={{marginLeft: '20vh'}}>뒤로 가기</button>
                    </form>
                    <button id="btnCapture" onClick={(event) => onBuyingClickHandler(event)} style={{marginRight: '20vh'}}>구매하기</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Report);