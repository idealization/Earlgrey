import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../../../img/logo.png'
import '../../../css/Report.css'
import { withRouter } from 'react-router-dom';

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

    const onHomeClickHandler = () => {
        props.history.push('/');
    };

    return (
        <div className='report'>
            <div className="simpleNavi">
                <img style={{marginLeft:'2vw'}} src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>
            <div className="list_board">
                <div className="question">
                    <h1 className="title">{date}</h1>
                </div>
                <div className="list">
                    <img id="captured" src={(userFrom+'_'+date).replace(/:/g,"")+'.png'} alt="test-ilustartion" />
                </div>
                <div className='box' id='box1'>
                    <div className='wordcloud'>
                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">제목</label>
                        <input type="text" className="form-control" value={title} onChange={onTitleHandler} />
                        <label htmlFor="colFormLabelLg" className="col-form-label text-body">내용</label>
                        <input type="text" className="form-control" value={content} onChange={onContentHandler} />
                    </div>
                </div>
                <div className="stopButton" id="end">
                    <form style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', margin: 'auto' }} onSubmit={onSubmitHandler}>
                        <button id="btnCapture" type="submit">목록 보기</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Report);