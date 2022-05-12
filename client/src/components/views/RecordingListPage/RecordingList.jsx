import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../img/logo.png';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import '../../../css/RecordingList.css';
import { withRouter } from 'react-router-dom';

const Record = styled.button`
    outline: none;
    border: outset;
    border-radius: 5px;
    cursor: pointer;
    width: 80%;
    height: 90px;
    margin: 1.7rem auto;
    display: flex;

    background: #e7f4f8;

    &:hover {
        background: ${lighten(0.05, '#E7F4F8')};
    }
    &:active {
        background: ${darken(0.05, '#E7F4F8')};
    }
`;

function RecordingList(props) {
    const [recordTimeList, setRecordTimeList] = useState([]);

    useEffect(() => {
        axios.get('/api/items/list', {
            params: {
                userFrom: localStorage.getItem('userId')
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('사진 목록을 불러오는 데 실패했습니다.');
            }
            for (var i = 0; i < response.data.list.length; i++) {
                var usertemp = (' ' + response.data.list[i]["userFrom"]).slice(1);
                var datetemp = (' ' + response.data.list[i]["createdAt"]).slice(1);
                console.log([usertemp, datetemp]);
                var temp = (usertemp+'_'+datetemp).replace(/:/g,"")+'.png';
                setRecordTimeList(list => [...list, temp]);
            }
        });
    }, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        props.history.push('/home');
    };

    const onReportHandler = (event, datetime) => {
        event.preventDefault();

        props.history.push({
            pathname: '/report',
            state: {
                date: datetime,
                userFrom: localStorage.getItem('userId')
            }
        });
    };

    const onHomeClickHandler = () => {
        props.history.push('/');
    };

    return (
        <div className="recordingList">
            <div className="simpleNavi">
                <img src={logo} alt="logo" onClick={onHomeClickHandler} role="button" />
            </div>
            <div className="list_board">
                <div className="question">
                    <h1 className="title">나의 스피치 기록</h1>
                </div>
                <div className="list">
                    {recordTimeList?.map((userdate,idx) => (
                        <form key={idx} onSubmit={(event) => onReportHandler(event,userdate)}>
                            <Record type="submit" userdate={userdate}>
                                {/* <span className="date" id="recording_date">
                                    {datetime.substring(0, 10)}
                                </span>
                                <span className="time" id="recording_time">
                                    {datetime.substring(11, 19)}
                                </span> */}
                                <img id="captured" src={userdate} alt="test-ilustartion" />
                            </Record>
                        </form>
                    ))}
                </div>
                <div className="stopButton" id="end">
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                        <button type="submit">끝내기</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(RecordingList);
