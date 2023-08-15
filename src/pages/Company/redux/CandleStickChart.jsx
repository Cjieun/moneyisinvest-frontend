import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const getLatestArray = (data) => {
  if (data.length === 0) {
    return [];
  }

  const latestDataIndex = data.length - 1;
  return data[latestDataIndex];
};

const processData = (data, realTimeData) => {
  if (!data || data.length === 0) {
    return [];
  }

  const realTimeDataByDate = realTimeData && realTimeData.length > 0 ? realTimeData.slice(-1).reduce((dataMap, item) => {
    if(item.currnet_time) {
      const year = item.currnet_time.slice(0, 4);
      const month = item.currnet_time.slice(5, 7) - 1;
      const day = item.currnet_time.slice(8, 10);
      const dateStr = new Date(year, month, day).toDateString();
  
      dataMap[dateStr] = item;
    }
    
    return dataMap;
  }, {}) : {};  

  return data.map((item) => {
    const year = item.current_date.slice(0, 4);
    const month = item.current_date.slice(4, 6) - 1;
    const day = item.current_date.slice(6, 8);

    const date = new Date(year, month, day);
    const dateStr = date.toDateString();
    const realTimeDataForDate = realTimeDataByDate[dateStr];

    if (realTimeDataForDate) {
      return {
        x: date,
        y: [
          Number(item.start_Price),
          Number(item.high_Price),
          Number(item.low_Price),
          Number(realTimeDataForDate.stock_price),
        ],
      };
    } else {
      return {
        x: date,
        y: [
          Number(item.start_Price),
          Number(item.high_Price),
          Number(item.low_Price),
          Number(item.end_Price),
        ],
      };
    }
  });
};

const CandleStickChart = ({ chartData, realTimeData = []}) => {
  const [processedData, setProcessedData] = useState(
    processData(getLatestArray(chartData), realTimeData)
  );

  const chartWidth = 930;
  const chartHeight = 430;

  const options = {
    chart: {
      type: 'candlestick',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#FF1C1C',
          downward: '#1C77FF',
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        show: true,
      },
    },
  };

  const series = [
    {
      name: 'candle',
      data: processedData,
    },
  ];

  useEffect(() => {
    setProcessedData(processData(getLatestArray(chartData), realTimeData));
  }, [chartData, realTimeData]);

  return (
    <Chart
      options={options}
      series={series}
      type="candlestick"
      width={chartWidth}
      height={chartHeight}
    />
  );
};

export default CandleStickChart;
