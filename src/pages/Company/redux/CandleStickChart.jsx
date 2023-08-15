// CandlestickChart.js
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export const CandlestickChart = ({ chartData }) => {
  const [annotations, setAnnotations] = useState([]);

  const colors = chartData.map((data) => data.fillColor);
  const weightedAvgStockPrice = chartData[chartData.length - 1].weighted_average_stock_price;

  const chartOptions = {
    chart: {
      type: 'candlestick',
      zoom: {enabled: true},
      toolbar: { show: false },
      events: {
        click: function (event, chartContext, config) {
          const { dataPointIndex } = config;
          if (dataPointIndex === chartData.length - 1) {
            setAnnotations([
              {
                x: chartData[dataPointIndex].x,
                strokeDashArray: 0,
                borderColor: 'red',
                label: {
                  borderColor: 'red',
                  style: {
                    color: '#fff',
                    background: 'red',
                  },
                  text: 'Viewing Live',
                },
              },
            ]);
          } else {
            setAnnotations([]);
          }
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: weightedAvgStockPrice,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Weighted Avg. Stock Price',
            position: 'right',
          },
        },
      ],
      points: annotations,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: 'green',
          downward: 'red',
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: colors.map((color, index) => ({
          offset: (index / chartData.length) * 100,
          color,
          opacity: 1,
        })),
      },
    },
    grid: {
        show: true,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },

    };

  const chartSeries = [
    {
      data: chartData,
      name: 'stock price',
    },
  ];

  return (
    <div id="chart" style={{ height: '100%', marginTop: 0 }}>
      <Chart options={chartOptions} series={chartSeries} type="candlestick" height="100%"/>
    </div>
  );
};
