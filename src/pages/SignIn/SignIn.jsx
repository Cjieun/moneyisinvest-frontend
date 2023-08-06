import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import "./SignIn.scss";
import Header from "../../systems/Header";
import Button from "components/Button";
import Footer from "components/Footer";
import Message from "components/Message";

export default function SignIn() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [isId, setIsId] = useState(false);
    const [idMessage, setIdMessage] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [rememberId, setRememberId] = useState(false);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const idRef = useRef("");
    const pwRef = useRef("");

    const onClickLogin = () => {
        if (idRef.current.value === '' && !(pwRef.current.value === '')) {
            idRef.current.focus();
            setIsId(true);
            setIdMessage("아이디가 입력되지 않았습니다.");
            setIsMessage(false);
            setMessage("");
        }
        else if (pwRef.current.value === '' && !(idRef.current.value === '')) {
            pwRef.current.focus();
            setIsMessage(true);
            setMessage("비밀번호가 입력되지 않았습니다.");
            setIsId(false);
            setIdMessage("");
        }
        else if (idRef.current.value === '' && pwRef.current.value === '') {
            setIsMessage(true);
            setMessage("아이디와 비밀번호를 입력해주세요.");
            setIsId(false);
            setIdMessage("");
        } else {
        axios
            .post("/api/v1/sign-in", {
                password: inputPw,
                uid: inputId,
            }).then((res) => {
                console.log("!!", res.data);
                if (res.data != null) {
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("id", res.data.uid);
                    setIsMessage(false);
                    setMessage("");
                    setIsId(false);
                    setIdMessage("");
                    if (rememberId) {
                        localStorage.setItem('rememberedUserId', inputId);
                    } else {
                        localStorage.removeItem('rememberedUserId');
                    }
                }
            }).catch((res) => {
                console.log("!!", res.data);
                setIsMessage(true);
                setMessage("아이디 혹은 비밀번호를 확인해주세요.");
                setIsId(false);
                setIdMessage("");
                }
            )}
    };
    const onClickEnter = (e) => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    }
    
    useEffect(() => {
        const rememberedUserId = localStorage.getItem('rememberedUserId');
        if (rememberedUserId) {
            setInputId(rememberedUserId);
            setRememberId(true);
        }
    }, []);

    return (
        <div className="loginContainer">
            <Header isLogin={false}/>
            <div className="loginBox">
                <div className="loginContent">
                    <div className="loginTitle">사용자 로그인</div>
                    <div>
                        <label className="idInput">아이디<input type="text" value={inputId} onChange={handleInputId} ref={idRef} onKeyPress={(e) => onClickEnter(e)}/></label>
                    </div>
                    <Message text={idMessage} state={isId}/>
                    <div>
                        <label className="pwInput">비밀번호<input type="password" value={inputPw} onChange={handleInputPw} ref={pwRef} onKeyPress={(e) => onClickEnter(e)}/></label>
                    </div>
                    <Message text={message} state={isMessage}/>
                    <div>
                        <label className="idRemember"><input type="checkbox" checked={rememberId} onChange={() => setRememberId(!rememberId)} />아이디 기억하기</label>
                    </div>
                    <div onClick={onClickLogin}>
                        <Button type="submit" state="login" onClick={onClickLogin}/>
                        <div className="loginEmail">이메일로 회원가입</div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}