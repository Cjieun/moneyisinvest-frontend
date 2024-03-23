import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "components/Button";

export default function Message({setIsPopupVisible, setIsDealDone, setIsSuccess}) {
    const MessageContainer = css`
    width: 28.1875rem;
    height: 17.25rem;
    border-radius: 1.25rem;
    background: #FFF;
    padding: 2.12rem 2.69rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `;
    const MessageText = css`
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.69rem;
    display: flex;
    align-items: center;
    `;
    const MessageInfo = css`
    color: #000;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2.19rem;
    `;
    const onClick = () => {
        if (setIsSuccess) {
            setIsPopupVisible(false);
            setIsDealDone(false);
            window.location.href = "/transactions";
        }
        else {
            setIsDealDone(false);
        }
    };
                
    return (
        <div css={MessageContainer}>
            <div css={MessageText}>거래가 {setIsSuccess ? "완료" : "취소"}되었어요</div>
            <div css={MessageInfo}>
                {setIsSuccess
                ? "성공적으로 거래를 마쳤어요. 내역을 확인하실래요?"
                : "보유하신 스톡이 부족하여 거래가 취소되었어요"
                }
            </div>
            <div onClick={onClick}>
            <Button state={setIsSuccess ? "dealdone" : "dealnone"}/>
            </div>
        </div>
    )
}