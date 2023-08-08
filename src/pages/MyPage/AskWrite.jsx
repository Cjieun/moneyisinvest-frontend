import React, {useState} from 'react';
import "./AskWrite.scss";
import Header from 'systems/Header';
import Profile from 'systems/Profile';
import Footer from 'components/Footer';
import Button from 'components/Button';

export default function AskWrite() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleInputContent = (e) => {
        setContent(e.target.value);
    }

    return(
        <div className="askWriteContainer">
            <Header />
            <div className="askWriteBox">
                <div className="askWriteContent">
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="askWriteProfile">
                        <div className="askWriteTitle">문의사항</div>
                        <div className="askWriteInfo">
                            <input type="text" className="askWriteInfo-title" placeholder='제목을 입력하세요' onChange={handleInputTitle} value={title}>
                            </input>
                            <div className="askWriteInfo-content">
                                <textarea placeholder="내용을 입력하세요" onChange={handleInputContent} value={content}/>
                            </div>
                            <div className="askWriteInfo-button"><Button state="askUpload"/></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}