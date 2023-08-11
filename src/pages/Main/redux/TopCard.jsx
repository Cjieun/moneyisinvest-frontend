/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useSelector } from 'react-redux';
import Card from 'systems/Card';
import { useScrollFadeIn } from "../../../hooks/useScrollFadeIn";

const TopCard = ({ ranking, startIdx, endIdx }) => {
  const topCards = ranking.slice(startIdx, endIdx).map((item, index) => (
    <div className="animated-card" key={index} {...useScrollFadeIn('left', 1, 1)}>
      <Card
        isVisible={true}
        company={item.stockName}
        code={item.stockCode}
        rate={item.preparation_day_before_rate}
        rateStatus={item.day_before_status}
        price={item.stockPrice}
        stock={item.coinPrice}
        rank={item.rank}
        img={item.stockUrl}
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
