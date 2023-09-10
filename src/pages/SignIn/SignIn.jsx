import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SignIn.scss";
import Header from "../../systems/Header";
import Button from "components/Button";
import Footer from "components/Footer";
import Message from "components/Message";
import {ReactComponent as Kakao} from "../../assets/images/kakaoLogin.svg";
import KaKaoLogin from "react-kakao-login";

export default function SignIn({ setIsLoggedIn }) {
  const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
  });  

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [isId, setIsId] = useState(false);
  const [idMessage, setIdMessage] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberId, setRememberId] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const idRef = useRef("");
  const pwRef = useRef("");

  const onClickLogin = () => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (idRef.current.value === "" && pwRef.current.value === "") {
      setIsMessage(true);
      setMessage("아이디와 비밀번호를 입력해주세요.");
      setIsId(false);
      setIdMessage("");
    } else if (idRef.current.value === "" && !(pwRef.current.value === "")) {
      idRef.current.focus();
      setIsId(true);
      setIdMessage("아이디가 입력되지 않았습니다.");
      setIsMessage(false);
      setMessage("");
    } else if (!inputId.match(EMAIL_REGEX)) {
      setIsId(true);
      setIdMessage("정확한 이메일을 입력해주세요!");
      setIsMessage(false);
      setMessage("");
    } else if (pwRef.current.value === "" && !(idRef.current.value === "")) {
      pwRef.current.focus();
      setIsMessage(true);
      setMessage("비밀번호가 입력되지 않았습니다.");
      setIsId(false);
      setIdMessage("");
    } else {
      apiClient
        .post("/api/v1/sign-in", {
          password: inputPw,
          uid: inputId,
        })
        .then((res) => {
          console.log("!!", res.data);
          if (res.data != null) {
            setIsLoggedIn(true);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("refresh-token", res.data.refreshToken);
            sessionStorage.setItem("id", res.data.uid);
            sessionStorage.setItem("name", res.data.name);
            setIsMessage(false);
            setMessage("");
            setIsId(false);
            setIdMessage("");
            if (!rememberId) {
              setInputId("");
            }
            setInputPw("");
            if (rememberId) {
              localStorage.setItem("rememberedUserId", inputId);
            } else {
              localStorage.removeItem("rememberedUserId");
            }
            if (location.state?.from === "/signUp") {
              navigate("/", { replace: true });
            } else if (location.state?.from) {
              navigate(location.state.from, { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          }
        })
        .catch((res) => {
          console.log(res);
          if (res.code === "ERR_BAD_RESPONSE") {
            alert("에러가 발생했습니다! 관리자에게 문의해주세요.");
            setInputId("");
            setInputPw("");
            setIsMessage(false);
            setMessage("");
            setIsId(false);
            setIdMessage("");
          } else {
            setIsMessage(true);
            setMessage("아이디 혹은 비밀번호를 확인해주세요.");
            setIsId(false);
            setIdMessage("");
          }
        });
    }
  };
  const onClickEnter = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  useEffect(() => {
    const rememberedUserId = localStorage.getItem("rememberedUserId");
    if (rememberedUserId) {
      setInputId(rememberedUserId);
      setRememberId(true);
    }
  }, []);

  /*const SocialKakao = () => {
    const kakaoClientId = '6f618ba4c1c9af893796352e14d62a8b';
    const kakaoOnSuccess = async (data) => {
      console.log(data);
      const idToken = data.response.access_token;
    }
    const kakaoOnFailure = (error) => {
      console.log(error);
    };
    return(
      <>
        <KaKaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
            style={{display: "none"}}
            className="kakao_login"
        />
      </>
    )
  }*/

  const SocialKakao = () => {
    const Rest_api_key = '57532f884b694bdc89f6d9e4284fa67d';
    const protocol = window.location.protocol; // 현재 페이지의 프로토콜 확인
    let redirect_uri;
    
    if (protocol === 'http:') {
        redirect_uri = 'http://localhost:3000/'; // 개발 환경일 경우
    } else if (protocol === 'https:') {
        redirect_uri = 'https://moneyisinvest.kr/'; // 실제 서비스 환경일 경우
    }

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = () => {
      window.location.href = kakaoURL
    }
    return (
      <div className="kakaoLogin" onClick={handleLogin} /*onClick={() => document.querySelector('.kakao_login').click()}*/>
        <Kakao className="kakaoTalk"/>
        <div onClick={handleLogin}>카카오 로그인</div>
    </div>
    )
  }

  return (
    <div className="loginContainer">
      <Header />
      <div className="loginBox">
        <div className="loginContent">
          <div className="loginTitle">사용자 로그인</div>
          <div>
            <label className="idInput">
              이메일 주소
              <input
                type="text"
                value={inputId}
                onChange={handleInputId}
                ref={idRef}
                onKeyPress={(e) => onClickEnter(e)}
              />
            </label>
          </div>
          <Message text={idMessage} state={isId} />
          <div>
            <label className="pwInput">
              비밀번호
              <input
                type="password"
                value={inputPw}
                onChange={handleInputPw}
                ref={pwRef}
                onKeyPress={(e) => onClickEnter(e)}
              />
            </label>
          </div>
          <Message text={message} state={isMessage} />
          <div>
            <label className="idRemember">
              <input
                type="checkbox"
                checked={rememberId}
                onChange={() => setRememberId(!rememberId)}
              />
              아이디 기억하기
            </label>
          </div>
          <div>
            <div onClick={onClickLogin}>
              <Button type="submit" state="login" />
            </div>
            <SocialKakao />
            <Link to="/signUp" style={{ textDecoration: "none" }}>
              <div className="loginEmail">이메일로 회원가입</div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
