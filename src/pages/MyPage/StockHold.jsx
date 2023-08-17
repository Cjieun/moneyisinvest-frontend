import React, { useState, useEffect } from "react";
import "./StockHold.scss";
//import axios from "axios";
import Header from "systems/Header";
import Profile from "systems/Profile";
import Footer from "components/Footer";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import axios from "axios";

export default function StockHold() {
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [holdStock, setHoldStock] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      apiClient
        .get("/api/v1/stock/get/users/stocks", {
          headers: {
            "X-Auth-Token": token,
          },
        })
        .then((res) => {
          console.log("보유 주식 렌더링 성공", res.data);
          setHoldStock(res.data);
        })
        .catch((err) => {
          if (err.response) {
            // 서버 응답이 온 경우 (에러 응답)
            console.log(
              "Error response:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
            console.log("Request error:", err.request);
          } else {
            // 오류가 발생한 경우 (일반 오류)
            console.log("General error:", err.message);
          }
        });
    } else {
      console.log("Token is null. Unable to send request.");
    }
  }, []);

  const handleToggleHeart = async (index) => {
    const updatedHoldStock = [...holdStock];
    updatedHoldStock[index].favorite_status = !updatedHoldStock[index].favorite_status;
    setHoldStock(updatedHoldStock);
    console.log(holdStock);

    try {
        // 토큰 값이 있는 경우에는 백엔드에 토큰 포함하여 요청 보내기
        const token = sessionStorage.getItem("token");

        // 상태에 따른 요청 경로 변경
        const requestPath = updatedHoldStock[index].favorite_status ? `/api/v1/favorite/add?stockId=${updatedHoldStock[index].stockCode}` : `/api/v1/favorite/remove?stockId=${updatedHoldStock[index].stockCode}`;

        const response = await apiClient.post(requestPath, {
            headers: {
                'X-Auth-Token': token,
            },
        });

        if (response.status === 200) {
            console.log('찜 상태 업데이트 성공');
            window.location.reload(); // 페이지 다시 로드
        } else {
            console.error('찜 상태 업데이트 실패');
            // 실패 처리 로직 추가
        }
    } catch (error) {
        console.error('찜 상태 업데이트 에러:', error);
        // 에러 처리 로직 추가
    }
};


  const holdItem = holdStock.map((item, index) => (
    <div className="holdItems" keys={index}>
      <div className="HoldItems-profile">
        <img alt="썸네일" src={item.stockUrl} className="HoldItems-img" />
        <div className="HoldItems-Title">{item.stockName}</div>
        <div className="HoldItems-Code">{item.stockCode}</div>
      </div>
      <div className="HoldItems-Rate">{item.rate}%</div>
      <div className="HoldItems-Value">
        <div className="HoldItems-Stock">{item.my_conclusion_sum_coin}</div>
        <div className="HoldItems-Price">{item.my_conclusion_sum_price}</div>
      </div>
      <div className="HoldItems-Value">
        <div className="HoldItems-Stock">{item.my_per_conclusion_coin}</div>
        <div className="HoldItems-Price">{item.my_per_conclusion_price}</div>
      </div>
      <div className="HoldItems-Value">
        <div className="HoldItems-Stock">{item.my_conclusion_sum_coin}</div>
        <div className="HoldItems-Price">{item.my_conclusion_sum_price}</div>
      </div>
      <div className="HoldItems-Value">
        <div className="HoldItems-Stock">{item.real_per_coin}</div>
        <div className="HoldItems-Price">{item.real_per_price}</div>
      </div>
      <div className="HoldItems-Num">{item.stockAmount}</div>
      <div className="holdItem-heart" onClick={() => handleToggleHeart(index)}>
        {item.favorite_status ? (
          <RxHeartFilled color="#85D6D1" />
        ) : (
          <RxHeart color="#85D6D1" />
        )}
      </div>
    </div>
  ));

  return (
    <div className="holdContainer">
      <Header />
      <div className="holdBox">
        <div className="holdContent">
          <div className="profile">
            <Profile />
          </div>
          <div className="holdProfile">
            <div className="holdTitle">보유 주식</div>
            <div className="HoldInfo">
              <div className="HoldInfo-top">
                <div className="HoldInfo-Img">종목</div>
                <div className="HoldInfo-Rate">수익률</div>
                <div className="HoldInfo-Price">평가금액</div>
                <div className="HoldInfo-Price2">매수금액</div>
                <div className="HoldInfo-Price3">평균단가</div>
                <div className="HoldInfo-Price4">현재가</div>
                <div className="HoldInfo-Num">보유 수량</div>
                <div className="HoldInfo-State">찜</div>
              </div>
              <div className="holdInfo-scrollable">{holdItem}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
