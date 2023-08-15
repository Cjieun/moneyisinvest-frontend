import React from "react";
import {ReactComponent as Right} from "../../assets/images/Right.svg";


export default function StockTime() {
    return (
        <div className="companyStockTimeBox">
            <div className="companyStockTime">2023.08.04 기준 장 거래 마감</div>
            <div className="companyStockTimeInfo">투자가 머니가 아닌, 실제 거래에서는 지금 주식을 사고 팔 수 없어요</div>
            <div className="companyStockTimeBook">
                <div>장 거래 시간 알아보기</div>
                <Right className="companyStockTimeIcon"/>
            </div>
        </div>
    )
}