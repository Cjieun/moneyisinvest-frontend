// TopItem.jsx (새로운 파일로 분리한 컴포넌트)

import React from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import Card from "systems/Card";

const TopCard = ({ ranking, startIdx, endIdx }) => {
    const topCards = ranking.slice(startIdx, endIdx).map((item, index) => (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <div className="animated-card" key={index} {...useScrollFadeIn('left', 1, (index + 2) * 0.2)}>
            <Card 
                isVisible={true}
                company={item.company}
                code={item.code}
                rate={item.rate}
                price={item.price}
                stock={item.value}
                rank={startIdx + index + 1} // 현재 rank 값에 index를 더하여 할당
            />
        </div>
    ));

    return (
        <div className="banner4-topContent">
            <div className="banner4-topCard">
                {topCards}
            </div>
        </div>
    );
};

export default TopCard;
