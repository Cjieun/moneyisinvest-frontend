import React, {useState, useEffect} from "react";
import "./UserMain.scss";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";
import Header from "systems/Header";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import Footer from "components/Footer";
import UserCard from "systems/UserCard";
import TopCard from "pages/Main/redux/TopCard";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateRanking, updateKOSPIData, updateKOSDAQData } from './redux/action';
import StockChartCard from "./redux/StockChartCard";

export default function UserMain() {
    
    const [ranking] = useState([
        {
            company: "삼성전자",
            code: "005930",
            rate: "99.9",
            price: "500,000",
            value: "5,000"
        },
        {
            company: "삼성전자",
            code: "005930",
            rate: "99.9",
            price: "500,000",
            value: "5,000"
        },
        {
            company: "삼성전자",
            code: "005930",
            rate: "99.9",
            price: "500,000",
            value: "5,000"
        },
        {
            company: "삼성전자",
            code: "005930",
            rate: "99.9",
            price: "500,000",
            value: "5,000"
        },
        {
            company: "삼성전자",
            code: "005930",
            rate: "99.9",
            price: "500,000",
            value: "5,000"
        },

    ])
    
    const dispatch = useDispatch();
    const rank = useSelector(state => state.rank);
    const kospiData = useSelector(state => state.kospiData.slice(-5)); // 최근 5개 데이터 추출
    const kosdaqData = useSelector(state => state.kosdaqData.slice(-5)); // 최근 5개 데이터 추출


    useEffect(() => {
        const kospiWebSocketUrl = 'ws://127.0.0.1:8080/kospi';
        const kosdaqWebSocketUrl = 'ws://127.0.0.1:8080/kosdaq';
        const stockRankWebSocketUrl = 'ws://127.0.0.1:8080/stockRank';
        
        // 코스피 웹소켓 열기
        const kospiSocket = new WebSocket(kospiWebSocketUrl);
        kospiSocket.onopen = () => {
            console.log("KOSPI Connected");
        };
        kospiSocket.onmessage = (event) => {
          // 코스피 데이터 처리
            const receivedData = JSON.parse(event.data);
            dispatch(updateKOSPIData(receivedData));
            console.log('KOSPI data:', receivedData);
        };
        kospiSocket.onclose = () => {
            console.log("KOSPI DisConnnected");
        };
        kospiSocket.onerror = (event) => {
            console.log(event);
        };

        // 코스닥 웹소켓 열기
        const kosdaqSocket = new WebSocket(kosdaqWebSocketUrl);
        kosdaqSocket.onopen = () => {
            console.log("KOSDAQ Connected");
        };
        kosdaqSocket.onmessage = (event) => {
          // 코스피 데이터 처리
            const receivedData = JSON.parse(event.data);
            dispatch(updateKOSDAQData(receivedData));
            console.log('KOSDAQ data:', receivedData);
        };
        kosdaqSocket.onclose = () => {
            console.log("KOSDAQ DisConnnected");
        };
        kosdaqSocket.onerror = (event) => {
            console.log(event);
        };
        
        // 주식 랭킹 웹소켓 열기
        const stockRankSocket = new WebSocket(stockRankWebSocketUrl);
        stockRankSocket.onopen = () => {
            console.log("Top 5 Connected");
        };
        stockRankSocket.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            dispatch(updateRanking(receivedData));
            //console.log(receivedData);
        };
        stockRankSocket.onclose = () => {
            console.log("Top5 DisConnnected");
        };
        stockRankSocket.onerror = (event) => {
            console.log(event);
        };
        
        return () => {
        kospiSocket.close();
        stockRankSocket.close();
      };
    }, [dispatch]);      

    // 받아온 값 자르기 예시
    const numberOfItemsToShow = 3;
    const filteredData = ranking.slice(0, numberOfItemsToShow);
    const userStock = filteredData.map((item, index) => (
        <UserCard item={item} index={index} key={index} />
    ));

    const topItem = [];
    for (let i = 0; i < rank.length; i += 3) {
        topItem.push(
            <TopCard ranking={rank} startIdx={i} endIdx={i + 3} key={i}/>
        );
    }

    return (
        <div className="MainContainer">
            <Header/>
            <div className="MainBox">
                <div className="MainContent">
                    <div className="MainBannerImage"/>
                    <div className="mainStock">
                        <div className="mainStockContent">
                            <div className="mainStockTitle" {...useScrollFadeIn('up', 1, 0)}>주요 지수</div>
                            <div className="mainStockChart">
                                <StockChartCard data={kospiData} />
                                <StockChartCard data={kosdaqData} />
                            </div>
                            <div className="mainStockHelp" {...useScrollFadeIn('up', 1, 0.5)}>
                                <LiaExclamationCircleSolid className="mainStockIcon"/>
                                <div>코스피, 코스닥이 정확히 무엇인가요?</div>
                            </div>
                        </div>
                    </div>
                    <div className="userStock">
                        <div className="userStockBox">
                            <div className="userStockText" {...useScrollFadeIn('down', 1, 0)}>
                                <div className="userStockTitle">내 보유 주식</div>
                                <Link to = "/stockHold" style={{ textDecoration: "none" }}>
                                <div className="userStockSubtitle">더보기</div>
                                </Link>
                            </div>
                            <div className="userStockCard">
                                {userStock}
                            </div>
                        </div>
                        <div className="userStockBox">
                            <div className="userStockText" {...useScrollFadeIn('down', 1, 0.5)}>
                                <div className="userStockTitle">내 관심 주식</div>
                                <Link to = "/stockInterest" style={{ textDecoration: "none" }}>
                                <div className="userStockSubtitle">더보기</div>
                                </Link>
                            </div>
                            <div className="userStockCard">
                                {userStock}
                            </div>
                        </div>
                        <div className="topStockBox">
                            <div className="topStockText" {...useScrollFadeIn('down', 1, 0.5)}>TOP 5</div>
                            {topItem}
                        </div>
                    </div>
                    <div className="lastBanner" {...useScrollFadeIn('down', 1, 1)}/>
                </div>
                <Footer />
            </div>
        </div>
    )
}