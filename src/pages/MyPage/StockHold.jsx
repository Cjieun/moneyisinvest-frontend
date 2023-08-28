import React, { useState, useEffect } from "react";
import "./StockHold.scss";
//import axios from "axios";
import Header from "systems/Header";
import Profile from "systems/Profile";
import Footer from "components/Footer";
import { RxHeartFilled, RxHeart } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StockHold() {
  const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
  });  

  const navigate = useNavigate();

  const [holdStock, setHoldStock] = useState([]);
  const [favoriteStatuses, setFavoriteStatuses] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      apiClient
        .get("/api/v1/stock/get/users/stocks", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        })
        .then((res) => {
          console.log("myStock Success", res);
          
          // Check if the response data is an array before setting the state.
          if (Array.isArray(res.data)) { 
            setHoldStock(res.data);
            const newFavoriteStatuses = {};
            for (let item of res.data) {
              newFavoriteStatuses[item.stockCode] = item.favorite_status;
            }
            setFavoriteStatuses(newFavoriteStatuses);
          } else { 
            console.error('API response data is not an array:', res.data); 
            setHoldStock([]); // Set to empty array in case of invalid data.
         }
       })
       .catch();
  } else {
    alert("로그인 해주세요!");
    navigate("/signIn", { replace: true });
    console.log("Token is null. Unable to send request.");  
  }
  }, [navigate]);

  const handleHeartClick = (stockId) => {
    const token = sessionStorage.getItem("token");
    const newIsHeartFilled = !favoriteStatuses[stockId];

    setFavoriteStatuses({
      ...favoriteStatuses,
      [stockId]: newIsHeartFilled,
    });
  
    if (newIsHeartFilled) {
      apiClient
        .post(
          "/api/v1/favorite/post",
          {},
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
            params: {
              stockId: stockId,
            },
          }
        )
        .then((res) => {
          console.log("관심 주식 추가", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(stockId);
      apiClient
        .delete(`/api/v1/favorite/remove?stockId=${stockId}`,
         {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        )
        .then((res) => {
          console.log("관심 주식 삭제", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  

  const holdItem = holdStock.map((item, index) => (
    <div className="holdItems" keys={index}>
      <div className="HoldItems-title">
        <div className="HoldItems-profile">
          <img alt="썸네일" src={item.stockUrl} className="HoldItems-img" />
          <div className="HoldItems-Title">{item.stockName}</div>
          <div className="HoldItems-Code">{item.stockCode}</div>
        </div>
        <div className={`HoldItems-Rate ${item.rate < 0 ? 'negative' : 'positive'}`}>
          {item.rate > 0 ? "+" : ""}{item.rate}%
        </div>
      </div>
      <div className="HoldItems-price">
        <div className="HoldItems-Value">
          <div className="HoldItems-Stock">{item.my_conclusion_sum_coin}</div>
          <div className="HoldItems-Price">{item.my_conclusion_sum_price}</div>
        </div>
        <div className="HoldItems-Value">
          <div className="HoldItems-Stock">{item.my_per_conclusion_coin}</div>
          <div className="HoldItems-Price">{item.my_per_conclusion_price}</div>
        </div>
        <div className="HoldItems-Value">
          <div className="HoldItems-Stock">{item.real_per_coin}</div>
          <div className="HoldItems-Price">{item.real_per_price}</div>
        </div>
        <div className="HoldItems-Value">
          <div className="HoldItems-Stock">{item.real_sum_coin_price}</div>
          <div className="HoldItems-Price">{item.real_sum_price}</div>
        </div>
      </div>
      <div className="HoldItems-State">
        <div className="HoldItems-Num">{item.stockAmount}</div>
        <div className="holdItem-heart" onClick={() => handleHeartClick(item.stockCode)}>
        {favoriteStatuses[item.stockCode] ? (
          <RxHeartFilled color="#85D6D1" size="1rem" />
        ) : (
          <RxHeart color="#85D6D1" size="1rem"/>
        )}
        </div>
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
                <div className="HoldInfo-title">
                  <div className="HoldInfo-Img">종목</div>
                  <div className="HoldInfo-Rate">수익률</div>
                </div>
                <div className="HoldInfo-Price">
                  <div className="HoldInfo-Price1">평가금액</div>
                  <div className="HoldInfo-Price2">매수금액</div>
                  <div className="HoldInfo-Price3">평균단가</div>
                  <div className="HoldInfo-Price4">현재가</div>
                </div>
                <div className="HoldInfo-events">
                  <div className="HoldInfo-Num">보유 수량</div>
                  <div className="HoldInfo-State">찜</div>
                </div>
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
