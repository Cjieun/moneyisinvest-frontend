import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const RealTimeLineChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0 && data.every((item) => item && item.price)) {
      setChartData(data);
    }
  }, [data]);

  if (!chartData || chartData.length === 0) {
    return <div>Loading...</div>;
  }
    const series = [
      {
        name: '코스피 코스닥 데이터',
        data: chartData.map(item => item.price),
      },
    ];
  
  const options = {
    chart: {
        id: 'realtime-line',
        type: 'line', // 이 부분을 추가
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
    toolbar: {
        show: false,
    },
    height: 87, // 높이 설정
    width: '100%', // 차트가 옆으로 흘러가도록 넓이 100% 설정
    },
    grid: {
        show: false, // grid 전체를 숨김니다.
    },
    xaxis: {
        type: 'numeric',
        labels: {
          show: false, // x축 레이블 숨기기
        },
        tooltip: {
          enabled: false, // x축 툴팁 숨기기
        },
        axisBorder: {
          show: false, // x축 선 숨기기
        },
        axisTicks: {
          show: false, // x축 띄엄띄엄 있는 선 숨기기
        },
        crosshairs: {
          show: false, // x축 크로스헤어 숨기기
        },
        grid: {
          show: false, // x축 그리드 라인 숨기기
        },
      },
    yaxis: {
    // y축 설정
    labels: {
        show: false, // y축 레이블 숨기기
      },
      axisBorder: {
        show: false, // y축 선 숨기기
      },
      axisTicks: {
        show: false, // y축 띄엄띄엄 있는 선 숨기기
      },
    },
    stroke: {
      colors: ['#1C77FF'],
      curve: 'smooth', // 곡선으로 선 표시
    },
  };

  return (
    <div style={{ width: '100%', height: '5.4375rem' }}>
      <ApexCharts options={options} series={series} type="line" height={81} />
    </div>
  );
};

export default RealTimeLineChart;
