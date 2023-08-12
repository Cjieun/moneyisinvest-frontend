/* eslint-disable react-hooks/rules-of-hooks */
// StockChartCard.jsx
import React from 'react';
import { useScrollFadeIn } from "../../../hooks/useScrollFadeIn";
import PriceLineChart from './PriceLineChart'; // PriceLineChart 컴포넌트를 import

const StockChartCard = ({ data }) => {
  if (!data) {
    return (
      <div>
        <div {...useScrollFadeIn('up', 1, 0.25)}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="stockChartCard" {...useScrollFadeIn('up', 1, 0.25)}>
      <div className="stockChartName">
        {data[4] ? data[4].title : 'Loading...'}
      </div>
      <div className="stockChartList">
        <div className="stockChartItem">지수</div>
        <div className="stockChartRateValue">
          {(data[4] && data[4].rate) ? (
            <span
              className={`${
                data[4].rate.includes('-') ? 'negative' : 'positive'
              }-rate`}
            >
              {data[4].rate.split(' ')[1]}
            </span>
          ) : (<span>Loading...</span>)}
        </div>
      </div>
      <div className="stockChartList">
        <div className="stockChartItem">주가</div>
        <div className="stockChartPriceValue">
          {data[4] ? data[4].price : 'Loading...'}
        </div>
      </div>
      <div className="stockChart">
        <PriceLineChart data={data} />
      </div>
    </div>
  );
};

export default StockChartCard;
