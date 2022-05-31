import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../../../img/logo.png'
import '../../../css/Report.css'
import { withRouter } from 'react-router-dom';
import 'moment-timezone';
import moment from 'moment';

function Report(props){
    const [userFrom, setUserFrom] = useState();
    const [date, setDate] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const itemId = props.location.state.itemId;
        const userFrom = props.location.state.userFrom;
        
        axios.get('/api/items/', {
            params: {
                _id: itemId
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('발표 태도 분석을 불러오는 데 실패했습니다.');
            }
            setUserFrom(userFrom);
            setDate(response.data.item.createdAt);
        });
    }, []);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    };
    
    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.history.push('/list');
    };

    const onHomeClickHandler = (event) => {
        event.preventDefault();
        props.history.push('/');
    };

    const onMintingClickHandler = (event) => {
        event.preventDefault();
        moment().tz("Asia/Seoul");
        var curr = moment().format('YYYY-MM-DD HH:mm:ss');

        axios.post('/api/minteds/', {
            _id: props.location.state.itemId,
            mintedFrom: userFrom,
            mintedAt: curr,
            title: title,
            content: content
        }).then((response) => {
            if (response.data.success) {
                props.history.push('/');
            } else {
                alert('실패했습니다.');
            }
        });
    };

    const onListClickHandler = (event) => {
        event.preventDefault();
        props.history.push('/list');
    };

    return (
        <div className='report'>
            <div className="simpleNavi">
                <img style={{marginLeft:'2vw'}} src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>
            <div className="list_board">
                <div className="question">
                    <h1 className="title">생성 날짜: {date}</h1>
                </div>
                <p>
                    <img id="captured" src={(userFrom+'_'+date).replace(/:/g,"")+'.png'} alt="test-ilustartion" />
                </p>
                <p className='box' id='box1' style={{position: 'fixed', top: '400px', marginLeft: '65px'}}>
                    <label htmlFor="colFormLabelLg" className="col-form-label text-body">제목</label>
                    <input type="text" className="form-control" value={title} onChange={onTitleHandler} />
                    <label htmlFor="colFormLabelLg" className="col-form-label text-body">내용</label>
                    <textarea type="text" className="form-control" value={content} onChange={onContentHandler} style={{height: '200px'}} />
                </p>
                <div className="stopButton" id="end">
                    <form style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', margin: 'auto' }} onSubmit={onSubmitHandler}>
                        <button type="submit" onClick={onListClickHandler} id="btnCapture" style={{marginLeft: '20vh'}}>목록 보기</button>
                    </form>
                    <button id="btnCapture" onClick={(event) => onMintingClickHandler(event)} style={{marginRight: '20vh'}}>NFT로 변환!</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Report);