// StockChart.js
import React from 'react';
import { CandlestickChart } from './CandleStickChart';

const MAX_DATA_POINTS = 30;

const StockChart = ({ stock }) => {

  console.log(stock);
  const stockData = stock.slice(-MAX_DATA_POINTS);

  const formatData = (data) => {
    const { stock_base_price, stock_high_price, stock_low_price, stock_open_price, stock_price, weighted_average_stock_price } = data;
    const fillColor = stock_price >= stock_base_price ? '#1C77FF' : '#FF1C1C';
  
    return {
      x: new Date(data.currnet_time),
      y: [stock_open_price, stock_high_price, stock_low_price, stock_price],
      fillColor,
      weighted_average_stock_price,
    };
  };

  return (
    <div className="companyStockChart">
      {stockData.length >= MAX_DATA_POINTS && (
        <CandlestickChart chartData={stockData.map(formatData)} />
      )}
    </div>
  );
};

export default StockChart;
