import React, {useState } from 'react';
import "./AskPage.scss";
import Header from 'systems/Header';
import Profile from 'systems/Profile';
import Footer from 'components/Footer';
import Button from 'components/Button';
import {Link} from 'react-router-dom';

export default function AskPage() {
    const [askList] = useState([
        {
            title: "저 파산 날 거 같은데 어떻게 해요?",
            progress: false,
            date: "2023.8.4.금",
        },
        {
            title: "삼성 언제 오를까요?",
            progress: true,
            date: "2023.8.1.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        },
        {
            title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
            progress: false,
            date: "2023.12.12.화"
        }
    ]);
    const AskListItem = askList.map((item) => (
        <div className="askInfo-content">
            <div className="askInfo-itemTitle">{item.title}</div>
            <div className="askInfo-items">
                <div className="askInfo-itemProgress">{item.progress ? "답변완료" : "답변대기중"}</div>
                <div className="askInfo-itemDate">{item.date}</div>
                <div className="askInfo-itemButton">
                    {item.progress ? (
                    <div className="askInfo-itemButton-placeholder"></div>
                    ) : (
                    <Button state="ask" className="askInfo-itemdelete" />
                    )}
                </div>            
            </div>
        </div>
    ));

    return (
        <div className="askContainer">
            <Header />
            <div className="askBox">
                <div className="askContent">
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="askProfile">
                        <div className="askTitle">문의사항</div>
                        <div className="askInfo">
                            <div className="askInfo-top">
                                <div className="askInfo-title">제목</div>
                                <div className="askInfo-progress">처리현황</div>
                                <div className="askInfo-date">문의일</div>
                                <div>삭제</div>
                            </div>
                            <div className="askInfo-scrollable">
                                {AskListItem}
                            </div>
                            <Link to="/askwrite" style={{ textDecoration: "none" }}>
                            <div className="askInfo-write"><Button state="askWrite" /></div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}