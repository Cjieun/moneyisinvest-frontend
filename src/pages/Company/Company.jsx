import React, {useEffect, useState} from "react";
import "./Company.scss";
import Header from "systems/Header";
import Footer from "components/Footer";
import StockChart from "./redux/StockChart";
import { useSelector, useDispatch } from 'react-redux';
import { updateStock, storeStock } from './redux/action';
import { FiChevronDown } from "react-icons/fi";
import {ReactComponent as Warning} from "../../assets/images/warning.svg";
import StockTime from "./StockTime";
import {ReactComponent as Heart} from "../../assets/images/heart.svg";
import Button from "components/Button";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Company({handleSetCompanyName}) {

    const apiClient = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const [stockName, setStockName] = useState('');
    const [news, setNews] = useState([]);

    const { stockId } = useParams(); // URL로부터 supportId를 가져옵니다.

    const companyName = stockName;

    const handleClick = () => {
        handleSetCompanyName(companyName);
    };

    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const storedStock = useSelector(state => state.storedStock);

    console.log(storedStock);
    useEffect(() => {   
        
        const token = sessionStorage.getItem('token');
        apiClient.get(`/api/v1/stock/get/info?stockId=${stockId}`, {
            headers: {
                "X-AUTH-TOKEN": token,
            }
        }).then((res) => {
            console.log("회사 정보 불러오기 성공", res.data);
            setStockName(res.data.stockName);
        }).catch(err => {
            console.log("회사 정보 불러오기 실패:", err);
        })

        apiClient.post("/api/v1/stock/get/stockByDay", {
            stockCode: stockId,
        }).then((res) => {
            console.log(res.data);
            dispatch(storeStock(res.data));
        }).catch(err => {
            console.log(err);
        })

        const apiUrl = `/api/v1/stock/get/news?stockId=${stockId}`;
        apiClient.get(apiUrl)
          .then(response => {
            console.log('응답 데이터:', response.data);
            setNews(response.data.slice(0, 3));
          })
          .catch(error => {
            console.error('에러 발생:', error);
          });

        const stockSocket = new WebSocket("ws://127.0.0.1:8080/stock");
        stockSocket.onopen = () => {
            console.log("Stock Connected");
            stockSocket.send(stockId);
        };
        stockSocket.onmessage = (res) => {
            const receivedData = JSON.parse(res.data); // 데이터를 객체로 변환
            dispatch(updateStock(receivedData));
            console.log(receivedData); // 수정된 데이터를 출력
        };
        stockSocket.onclose = () => {
            console.log("Stock DisConnnected");
        };
        stockSocket.onerror = (event) => {
            console.log(event);
        };
        
        return () => {
            stockSocket.close();
        };



    }, [dispatch, stockId]);      

    const newsItem = news.map((item) => (
        <div className="companynewsList">
            <div className="companynewsItems" onClick={() => window.open(item.newsUrl)}>
                <div className="companynewsItemCompany">{item.newsCompany}</div>
                <div className="companynewsItemTitle">{item.newsTitle}</div>
                <div className="companynewsItemContent">{item.newsPreview}</div>
            </div>
            <img alt="썸네일" src={item.newsThumbnail} className="companynewsImage"/>
        </div>
    ))


    return (
        <div className="companyContainer">
            <Header />
            <div className="companyBox">
                <div className="companyContent">
                    <div className="companyChart">
                        <StockChart stock={stock} storedStock={storedStock}/>
                    </div>
                    <div className="companyHelp">
                        <div className="companyHelpText">
                            <Warning className="companyStockIcon"/>
                            <div>주식 차트에도 패턴이 있다는 거 알고 계신가요?</div>
                        </div>
                        <FiChevronDown className="companyStockDown"/>
                    </div>
                    <div className="companyInfo">
                        <div className="companyInfoTitle">
                            <div className="companyName">{companyName}</div>
                            <div className="companyMyStock">나는 이 주식을 총 100 주 보유하고 있어요</div>
                        </div>
                        <div className="companyInfoContent">
                            <div className="companyStockDeal">
                                <div className="companyStockDeal-stock">694스톡</div>
                                <div className="companyStockDeal-price">69,400원</div>
                                <StockTime />
                            </div>
                            <div className="companyStockBtn">
                                <Heart className="companyStockHeart"/>
                                <div className="companyStockDealBtn">
                                    <Button state="stocksell"/>
                                    <Button state="stockbuy"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="companyNews">
                        <div className="companyNewsText">
                            <div className="companyNewsTitle">회사 뉴스</div>
                            <Link to= {`/news/${stockId}`} style={{ textDecoration: "none" }} onClick={handleClick}>
                            <div className="companyNewsSubtitle">더보기</div>
                            </Link>
                        </div>
                        <div className="companyNewsList">
                            {newsItem}
                        </div>
                    </div>
                    <div>

                    </div>
                    <div></div>
                    <div></div>
                </div>
                <Footer />
            </div>
        </div>
    )
}