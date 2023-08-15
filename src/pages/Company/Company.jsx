import React, {useEffect} from "react";
import "./Company.scss";
import Header from "systems/Header";
import Footer from "components/Footer";
import StockChart from "./redux/StockChart";
import { useSelector, useDispatch } from 'react-redux';
import { updateStock } from './redux/action';
import { FiChevronDown } from "react-icons/fi";
import {ReactComponent as Warning} from "../../assets/images/warning.svg";
import StockTime from "./StockTime";
import {ReactComponent as Heart} from "../../assets/images/heart.svg";
import Button from "components/Button";

export default function Company() {

    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);

    useEffect(() => {        
        const stockSocket = new WebSocket("ws://127.0.0.1:8080/stock");
        stockSocket.onopen = () => {
            console.log("Stock Connected");
            const stockId = '005930';
            stockSocket.send(stockId);
        };
        stockSocket.onmessage = (res) => {
            const receivedData = JSON.parse(res.data); // 데이터를 객체로 변환
            dispatch(updateStock(receivedData));
            //console.log(receivedData); // 수정된 데이터를 출력
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
    }, [dispatch]);      

    return (
        <div className="companyContainer">
            <Header />
            <div className="companyBox">
                <div className="companyContent">
                    <div className="companyChart">
                        <StockChart stock={stock}/>
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
                            <div className="companyName">삼성전자</div>
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
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <Footer />
            </div>
        </div>
    )
}