    import React, {useState, useEffect} from "react";
    import "./Transactions.scss";
    import axios from "axios";
    import Header from "systems/Header";
    import Profile from "systems/Profile";
    import Footer from "components/Footer";
    
    export default function StockTransaction() {
        const [transStock, setTransStock] = useState([
            /*{
                image: "",
                company: "삼",
                stockCode: "005930",
                price: "500,000", //거래금
                value: "5,000", //거래 스톡가
                volume: "50", //거래 수량
                date: "2023.12.11", //거래 일시
                status: true, //매수/매도
            },*/
        ]); 

        useEffect(() => {
            const token = sessionStorage.getItem("token");
        
            //주식 거래 내역
            const fetchData = async () => {
              console.log("fetchData 호출"); 
              if (!token || token.trim() === "") {
                console.error("토큰이 누락되었습니다. 로그인 후 다시 시도해 주세요.");
                return;
              }
          
              try {
                const response = await axios.get("api/v1/stock/get/users/stocks/history", {
                  headers: {
                    "X-AUTH-TOKEN": token,
                  },
                });
                
                const formattedData = response.data.map(item => {
                  const date = item.transactionDate.split(' ')[0];
                  const statusText = item.status ? "매수" : "매도";
                  return { ...item, transactionDate: date, status: statusText };
                });

                setTransStock(formattedData);
                //setTransStock(response.data);
                console.log(response);
                console.log("주식 거래 내역 load success");
              } catch (error) {
                // 에러 처리
                console.error("API 요청 중 에러가 발생했습니다:", error);
              }
            };
          
            fetchData();
          }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 실행되도록 합니다. 

  
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

                                    <div className="transInfo-content">
                                      <table>
                                        <thead>
                                          <tr>
                                            <th className="transInfo-image"/>
                                            <th className="transInfo-event">종목</th>
                                            <th>거래금</th>
                                            <th>거래 스톡가</th>
                                            <th>거래 수량</th>
                                            <th>거래 일시</th>
                                            <th>매수/매도</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {transStock.map((item) => (
                                          <tr className="transItems" key={item.id}>
                                          <td><img alt="company" className="transItem-image" src={item.stockLogo}></img></td>
                                          <td><div className="transItems-name">{item.stockName}</div>
                                          <div className="transItems-code">{item.stockCode}</div></td>
                                          <td>{item.unitPrice}원</td>
                                          <td>{item.stockPrice}스톡</td>
                                          <td>{item.quantity}주</td>
                                          <td>{item.transactionDate}</td>
                                          <td>{item.status}</td>
                                          </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>  
        )  
    }
