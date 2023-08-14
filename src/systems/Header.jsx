import React, {useEffect, useContext} from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import {ReactComponent as Search} from "../assets/images/search.svg";
import {ReactComponent as Coin} from "../assets/images/coin.svg";
import {Link, useNavigate} from "react-router-dom";
//import profileImage from "../assets/images/angma.jpg";
import { AuthContext } from "context/AuthContext";

export default function Header({coinNum}) {
    const {isLoggedIn, token, userName, userProfile} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            axios.get("/api/v1/profile/get", {
                headers: {
                    'X-Auth-Token': token,
                }
            })
            .then((res) => {
                console.log("헤더 프로필 불러오기 성공", res.data);
            }).catch((res) => {
                console.log("헤더 프로필 불러오기 실패", res);
            })
        }
    }, [isLoggedIn, navigate, userProfile, userName, token]);

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
    margin-left: ${isLoggedIn ? '2.63rem' : '3.25rem' };
    margin-right: ${isLoggedIn ? '2.62rem' : '3.31rem' };
    gap: ${isLoggedIn ? '3.25rem' : '5rem' };
    `;
    const item = css`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    `;
    const searchBox = css`
    width: ${isLoggedIn ? '16.0625rem' : '17.25rem'};
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #F1F1F1;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: ${isLoggedIn ? '1.25rem' : '2rem'};
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
    display: ${isLoggedIn ? 'none' : 'block' }
    `;
    const coin = css`
    display: ${isLoggedIn ? 'block' : 'none'};
    color: #3eb7af;
    font-size: 0.8125rem;
    font-weight: 600;
    margin: auto 0.33rem auto 0;
    `;
    const coinLogo = css`
    display: ${isLoggedIn ? 'block' : 'none'};
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
    display: ${isLoggedIn ? 'block' : 'none'};
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.37rem auto 0;
    `;
    const headerprofile = css`
    display: ${isLoggedIn ? 'block' : 'none'};
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
                    <div css={nickname}>{userName}</div>
                    <img alt="profile" src={userProfile} css={headerprofile} />
                </Link>
            </div>
        </div>
    )
}