// actions.js 파일에서 updateRanking 액션을 정의한대로 그대로 사용합니다.
export const updateRanking = (data) => ({
  type: 'UPDATE_RANKING',
  payload: data,
});

// updateKOSPIData 액션을 추가하여 코스피 데이터도 업데이트합니다.
export const updateKOSPIData = (data) => ({
  type: 'UPDATE_KOSPI_DATA',
  payload: data,
});

// updateKOSDAQData 액션을 추가하여 코스피 데이터도 업데이트합니다.
export const updateKOSDAQData = (data) => ({
  type: 'UPDATE_KOSDAQ_DATA',
  payload: data,
});
