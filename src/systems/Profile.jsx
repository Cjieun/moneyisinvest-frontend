import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {ReactComponent as ProfileImage} from "../assets/images/profile2.svg";
import {ReactComponent as Coin} from "../assets/images/coin.svg";

const profileContainer = css`
    width: 10.875rem;
    height: 29.5rem;
`;
const profile = css`
    width: 7.5rem;
    height: 7.5rem;
    display: flex;
    margin: 0.56rem auto 0.81rem auto;
`
const name = css`
    text-align: center;
    color: #000;
    font-size: 1.125rem;
    font-weight: 600;
`;
const coin = css`
    display: flex;
    margin: 0.25rem auto 0 auto;
    justify-content: center;
    height: 1.25rem;
    align-items: center;
    gap: 0.1875rem;
`;
const coinImage = css`
    width: 1.02113rem;
    height: 1.05194rem;
`;
const coinText = css`
    color: #000;
    font-size: 0.75rem;
    font-weight: 500;
    span {
        color: #000;
        font-size: 0.8125rem;
        font-weight: 600;
        margin-right: 0.12rem;
    }
`
const line = css`
    width: 9.25rem;
    border: 0;
    height: 0.0625rem;
    background: #85d6d1;
    display: flex;
    margin: 1rem auto 2rem auto;
`
const list = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    li {
        color: #B0B0B0;
        font-size: 0.875rem;
        font-weight: 600;
    }
`
export default function Profile(props) {
    return(
        <div css={profileContainer}>
            <ProfileImage css={profile}/>
            <div css={name}>{props.name}님</div>
            <div css={coin}>
                <Coin css={coinImage}/>
                <div css={coinText}><span>{props.coinNum}</span>스톡 보유중</div>
            </div>
            <hr css={line}/>
            <ul css={list}>
                <li>마이페이지</li>
                <li>보유 주식</li>
                <li>관심 주식</li>
                <li>거래 내역</li>
                <li>문의사항</li>
            </ul>
        </div>
    )
}