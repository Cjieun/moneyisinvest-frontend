import React, {useState, useEffect} from "react";
import "./GuestMain.scss";
import {useScrollFadeIn} from "../../hooks/useScrollFadeIn";
import Header from "systems/Header";
import Footer from "components/Footer";
import {ReactComponent as SmartPhone} from "../../assets/images/smartphone.svg";
import {ReactComponent as MainCoin} from "../../assets/images/mainCoin.svg";
import {ReactComponent as Gift} from "../../assets/images/gift.svg";
import TopCard from "systems/TopCard";

export default function GuestMain() {

    useEffect(() => {
        // 웹소켓 연결 설정
        const socket = new WebSocket('ws://127.0.0.1:8080/stockRank');
    
        // 연결이 열릴 때 처리
        socket.onopen = () => {
          console.log('WebSocket connection opened');
        };
    
        // 데이터 수신 처리
        socket.onmessage = event => {
          const receivedData = JSON.parse(event.data);
          console.log('Received data:', receivedData);
        };
    
        // 연결이 닫힐 때 처리
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };

        socket.onerror = (err) => {
            console.log('Websocket connection error: ', err.message);
        }
    
        // 컴포넌트가 언마운트될 때 연결 해제
        return () => {
          socket.close();
        };
      }, []);
    
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

    const topItem = [];
    for (let i = 0; i < ranking.length; i += 3) {
        topItem.push(
            <div className="banner4-topContent" key={i}>
                <div className="banner4-topCard" >
                    <TopCard ranking={ranking} startIdx={i} endIdx={i + 3} key={i} />
                    {i === 3 && (
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    <div className="banner4-topCard" {...useScrollFadeIn('left', 1, 1)}>
                        <div className="banner4-topText">
                            <div className="banner4-topTitle">
                                <div>주식에 필요한</div>
                                <div>모든 것을 제공해드려요</div>
                            </div>
                            <div className="banner4-topSubtitle">
                                <div>기본적인 용어, 차트 종류,</div>
                                <div>이야기를 나눌 수 있는 커뮤니티</div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }
    return (
        <div className="MainContainer">
            <Header/>
            <div className="MainBox">
                <div className="MainContent">
                    <div className="MainBannerImage"/>
                    <div className="banner2">
                        <div className="banner2-box">
                            <SmartPhone className="banner2-image" {...useScrollFadeIn('up', 1, 0)}/>
                            <div className="banner2-content">
                                <div className="banner2-mainText" {...useScrollFadeIn('up', 1, 0.5, 1)}>
                                    <div>알바비는 오르지 않고</div>
                                    <div>투자를 하기엔 어려우셨나요?</div>
                                </div>
                                <div className="banner2-subText" {...useScrollFadeIn('up', 1, 0.75, 1)}>
                                    <div>혼자서 공부하기엔 너무 어려운 주식</div>
                                    <div>투자가 머니와 쉽게 공부해요</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner3">
                        <div className="banner3-box">
                            <div className="banner3-title">
                                <div className="banner3-subTitle" {...useScrollFadeIn('up', 1, 0)}>여러분의 돈은 걱정하지 마세요</div>
                                <div className="banner3-mainTitle" {...useScrollFadeIn('up', 1, 0.25)}>
                                    <div>처음 하는 주식, 여러분의</div>
                                    <div>돈은 투자가 머니에서 책임질게요</div>
                                </div>
                                <div className="banner3-content">
                                    <div className="banner3-first">
                                        <div className="banner3-coin">
                                            <MainCoin className="banner3-coinImage" {...useScrollFadeIn('left', 1, 0.75)}/>
                                            <div {...useScrollFadeIn('down', 1, 1.25)}>* 6.0 코인이 입금 되었습니다.</div>
                                        </div>
                                        <div className="banner3-coinText" {...useScrollFadeIn('left', 1, 1)}>
                                            <div className="banner3-coinTitle" >
                                                <div>실제 화폐 대신</div>
                                                <div>자체 코인 "스톡"으로 안전하게!</div>
                                            </div>
                                            <div className="banner3-coinSubtitle">가상의 코인으로 마음껏 연습하세요</div>
                                        </div>
                                    </div>
                                    <div className="banner3-second">
                                        <div className="banner3-giftText" {...useScrollFadeIn('right', 1, 1.5)}>
                                            <div className="banner3-giftTitle" >
                                                <div>투자를 통해 코인을 모아</div>
                                                <div>상품을 구매하세요</div>
                                            </div>
                                            <div className="banner3-giftSubtitle">
                                                <div>스타벅스 커피부터 아이패드까지</div>
                                                <div>얻을 수 있는 기회를 놓치지 마세요</div>
                                            </div>
                                        </div>
                                        <Gift className="banner3-gift" {...useScrollFadeIn('right', 1, 1.75)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner4">
                        <div className="banner4-box">
                            <div className="banner4-title">
                                <div className="banner4-mainTitle" {...useScrollFadeIn('up', 1, 0)}>모의 투자라 도움이 안 될 거 같나요?</div>
                                <div className="banner4-subTitle" {...useScrollFadeIn('up', 0.5, 0.25)}>
                                    <div>실제 상장의 정보로</div>
                                    <div>실전 같은 모의 투자를 즐기세요</div>
                                </div>
                            </div>
                            <div className="banner4-content">
                                <div className="banner4-top" {...useScrollFadeIn('up', 1, 0.5)}>실시간 TOP 5</div>
                                {topItem}
                            </div>
                        </div>
                    </div>
                    <div className="lastBanner" {...useScrollFadeIn('down', 1, 1)}/>
                </div>
                <Footer />
            </div>
        </div>
    )
}