import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import {ReactComponent as Search} from "../assets/images/search.svg";
import {ReactComponent as Coin} from "../assets/images/coin.svg";
import {ReactComponent as Profile} from "../assets/images/profile1.svg";

export default function Header({ isLogin, coinNum, profileName }) {
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
    margin-left: ${isLogin ? '4.25rem' : '4.87rem' };
    margin-right: ${isLogin ? '1.88rem' : '2.56rem' };
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
    margin-right: ${isLogin ? '1.38rem' : '2rem'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    `;
    const search = css`
    color: #B0B0B0;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
    margin: auto 0 auto 1.25rem;
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
    margin: auto 0.21rem auto 0;
    `;
    const coinLogo = css`
    display: ${isLogin ? 'block' : 'none'};
    width: 1.838rem;
    height: 1.89344rem;
    flex-shrink: 0s;
    margin: auto 0.95rem auto 0;
    `;
    const nickname = css`
    display: ${isLogin ? 'block' : 'none'};
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.38rem auto 0;
    `;
    const profile = css`
    display: ${isLogin ? 'block' : 'none'};
    width: 2.25rem;
    height: 2.25rem;
    margin: auto 0.75rem auto 0;
    `
    return (
        <div css={headerContainer}>
            <div css={header}>
                <Logo css={logo} />
                <div css={nav}>
                    <div css={item}>회사</div>
                    <div css={item}>뉴스</div>
                    <div css={item}>교과서</div>
                    <div css={item}>상점</div>
                </div>
                <div css={searchBox}>
                    <div css={search}>Search...</div>
                    <Search css={searchLogo} />
                </div>
                <div css={login}>로그인</div>
                <div css={coin}>{coinNum} 톡스</div>
                <Coin css={coinLogo}/>
                <div css={nickname}>{profileName}</div>
                <Profile css={profile} />
            </div>
        </div>
    )
}