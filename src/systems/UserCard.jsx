// UserCard.jsx (새로운 파일로 분리한 컴포넌트)

import React from "react";
import { Link } from "react-router-dom";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import Card from "systems/Card";

const UserCard = ({ item, index, isHold }) => {

    return (
        <div className="animated-card" key={index} {...useScrollFadeIn('left', 1, (index + 1) * 0.2)}>
            <Link
            to={`/company/${item.stockCode}`}
            style={{ textDecoration: "none", color: "#797979" }}
            >
            <Card 
                isVisible={false}
                company={item.stockName}
                code={item.stockCode}
                rate={item.rate}
                price={item.real_per_price}
                stock={item.real_per_coin}
                isHold={isHold}
                img={item.stockUrl}
            />
            </Link>
        </div>
    );
};

export default UserCard;
