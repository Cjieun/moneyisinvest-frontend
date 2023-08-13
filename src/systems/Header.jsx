import React, {useState, useEffect} from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import {ReactComponent as Search} from "../assets/images/search.svg";
import {ReactComponent as Coin} from "../assets/images/coin.svg";
import {Link} from "react-router-dom";
//import profileImage from "../assets/images/angma.jpg";

export default function Header({coinNum}) {
    const [isLogin, setIsLogin] = useState(false);
    const [profileName, setProfileName] = useState("");
    const [profileImage, setProfileImage] = useState("");

    useEffect(() => {
		if (sessionStorage.getItem("token") !== null) {
            // sessionStorage 에 token 라는 key 값으로 저장된 값이 있다면
			// 로그인 상태 변경
			setIsLogin(true);
            setProfileName(sessionStorage.getItem("name"));
            const token = sessionStorage.getItem('token');
            axios.get("/api/v1/profile/get", {
                headers: {
                    'X-Auth-Token': token,
                }
            })
            .then((res) => {
                console.log("헤더 프로필 불러오기 성공", res.data);
                setProfileImage(res.data.url)
            }).catch((res) => {
                console.log("헤더 프로필 불러오기 실패", res);
            })
            } else {
			// sessionStorage 에 token 라는 key 값으로 저장된 값이 없다면
		}
	}, []);

    const headerContainer = css`
    position: sticky;
    top: 0;
    flex-shrink: 0;
    fill: rgba(255, 255, 255, 0.19);
    background-blend-mode: overlay;
    backdrop-filter: blur(20px); 
    z-index: 999;
    `;
    const header = css`
    flex-shrink: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 61.625rem;
    height: 3.875rem;
    `;
    const logo = css`
    width: 9.375rem;
    height: 3.125rem;
    flex-shrink: 0;
    margin: auto 0;
    `;
    const nav = css`
    display: inline-flex;
    align-items: flex-start;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: ${isLogin ? '2.63rem' : '3.25rem' };
    margin-right: ${isLogin ? '2.62rem' : '3.31rem' };
    gap: ${isLogin ? '3.25rem' : '5rem' };
    `;
    const item = css`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    `;
    const searchBox = css`
    width: ${isLogin ? '16.0625rem' : '17.25rem'};
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #F1F1F1;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: ${isLogin ? '1.25rem' : '2rem'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    `;
    const search = css`
    color: #000;
    margin: auto 1.25rem;
    background-color: #F1F1F1;
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    &::placeholder {
        color: #B0B0B0;
        font-size: 0.75rem;
        font-weight: 500;
    }
    `;
    const searchLogo = css`
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    margin: auto 0.94rem auto 0;
    `;
    const login = css`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.94rem auto 0;
    flex-shrink: 0;
    display: ${isLogin ? 'none' : 'block' }
    `;
    const coin = css`
    display: ${isLogin ? 'block' : 'none'};
    color: #3eb7af;
    font-size: 0.8125rem;
    font-weight: 600;
    margin: auto 0.33rem auto 0;
    `;
    const coinLogo = css`
    display: ${isLogin ? 'block' : 'none'};
    width: 1.838rem;
    height: 1.89344rem;
    flex-shrink: 0s;
    margin: auto 0.95rem auto 0;
    `;
    const profile = css`
    display: flex;
    flex-direction: row;
    `;
    const nickname = css`
    display: ${isLogin ? 'block' : 'none'};
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.37rem auto 0;
    `;
    const headerprofile = css`
    display: ${isLogin ? 'block' : 'none'};
    width: 2.25rem;
    height: 2.25rem;
    margin: auto 0.75rem auto 0;
    border-radius: 50%;
    `

    return (
        <div css={headerContainer}>
            <div css={header}>
                <Link to = "/" style={{ textDecoration: "none" }}>
                <Logo css={logo}/>
                </Link>
                <div css={nav}>
                    <div css={item}>회사</div>
                    <Link to = "/allNews" style={{ textDecoration: "none" }}>
                    <div css={item}>뉴스</div>
                    </Link>
                    <Link to = "/Textbook" style={{ textDecoration: "none" }}>
                    <div css={item}>교과서</div>
                    </Link>
                    <Link to = "/Store" style={{ textDecoration: "none" }}>
                    <div css={item}>상점</div>
                    </Link>
                </div>
                <div css={searchBox}>
                    <input css={search} placeholder="Search..."></input>
                    <Search css={searchLogo} />
                </div>
                <Link to = "/signIn" style={{ textDecoration: "none" }} css={login}>
                <div>로그인</div>
                </Link>
                <div css={coin}>{coinNum} 스톡</div>
                <Coin css={coinLogo}/>
                <Link to = "/mypage" style={{ textDecoration: "none" }} css={profile}>
                    <div css={nickname}>{profileName}</div>
                    <img alt="profile" src={profileImage} css={headerprofile} />
                </Link>
            </div>
        </div>
    )
}