    import React, {useState, useEffect} from "react";
    import "./Transactions.scss";
    import axios from "axios";
    import Header from "systems/Header";
    import Profile from "systems/Profile";
    import Footer from "components/Footer";
    
    export default function StockTransaction() {
        const [transStock, setTransStock] = useState([
            {
                image: "",
                company: "삼",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
            {
                image: "",
                company: "삼성",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
    
            {
                image: "",
                company: "삼성전",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
            {
                image: "",
                company: "삼성전자자",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
            {
                image: "",
                company: "삼성전자ㅋㅋ",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
            {
                image: "",
                company: "삼성전자!!",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
            {
                image: "",
                company: "삼성전자",
                code: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: "매수", //매수/매도
            },
        ]);
    
        
        useEffect(() => {
        const fetchStockHistory = async () => {
            try {
              // 토큰 값이 있는 경우에는 백엔드에 토큰 포함하여 요청 보내기
              const token = sessionStorage.getItem("token");
          
              const response = await axios.post(
                "api/v1/stock/get/users/stocks/history",
                {},
                {
                  headers: {
                    "X-Auth-Token": token,
                  },
                }
              );
              setTransStock(response.data);
              if (response.status === 200) {
                console.log("주식 내역 상태 업데이트 성공");
              } else {
                console.error("주식 내역 상태 업데이트 실패");
                // 실패 처리 로직 추가
              }
            } catch (error) {
              console.error("주식 내역 상태 업데이트 에러:", error);
              // 에러 처리 로직 추가
            }
          };
          
          fetchStockHistory();
        }, []); 
          
        
    
        const transItem = transStock.map((item, index) => (
            <div className="transItems" keys={index}>
               <div className="transItem-title">
                    <img alt="company" className="transItem-image"></img>
                    <div className="transItem-events">
                        <div className="transItem-event">{item.company}</div>
                        <div className="transItem-code">{item.code}</div>
                    </div>
                </div>
                <div className="transItem-content">
                    <div className="transItem-price">{item.price}원</div>
                    <div className="transItem-value">{item.value}스톡</div>
                    <div className="transItem-volume">{item.volume}주</div>
                    <div className="transItem-date">{item.date}</div>
                    <div className="transItem-status">{item.status}</div>
                </div>
            </div>
       
        ))
        return (
            <div className="transContainer">
                <Header />
                <div className="transBox">
                    <div className="transContent">
                        <div className="profile">
                            <Profile/>
                        </div>
                        <div className="transProfile">
                            <div className="transTitle">주식 거래 내역</div>
                            <div className="transInfo">
                                <div className="transInfo-top">
                                    <div className="transInfo-title">
                                        <div className="transInfo-image"></div>
                                        <div className="transInfo-event">종목</div>
                                    </div>
                                    <div className="transInfo-content">
                                        <div className="stockValue">
                                            <div className="transInfo-price">거래금</div>
                                            <div className="transInfo-value">스톡가</div>
                                            <div className="transInfo-volume">거래 수량</div>
                                            <div className="transInfo-date">거래 일시</div>
                                            <div className="transInfo-status">매수/매도</div>
                                        </div>
                                        {/*<div className="stockValue">
                                            <div className="transInfo-volume">거래 수량</div>
                                            <div className="transInfo-date">거래 일시</div>
                                        </div>
                                        <div className="stockValue">
                                            <div className="transInfo-status">매수/매도</div>
                                        </div>*/}
                                    </div>
                                </div>
                                <div className="holdInfo-scrollable">
                                    {transItem}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>  
        )  
    }
