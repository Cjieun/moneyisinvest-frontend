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
import {ReactComponent as Profile} from "../../assets/images/profile.svg";
import {ReactComponent as CommentHeart} from "../../assets/images/commentHeart.svg";
import {ReactComponent as Comment} from "../../assets/images/comment.svg";
import {ReactComponent as Education} from "../../assets/images/더보기 화면.svg";


export default function Company({handleSetCompanyName}) {

    const apiClient = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const [stockName, setStockName] = useState('');
    const [news, setNews] = useState([]);
    const [community, setCommunity] = useState([]);

    const { stockId } = useParams(); // URL로부터 supportId를 가져옵니다.

    const companyName = stockName;

    const handleClick = () => {
        handleSetCompanyName(companyName);
    };

    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const storedStock = useSelector(state => state.storedStock);

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

        const newsapiUrl = `/api/v1/stock/get/news?stockId=${stockId}`;
        apiClient.get(newsapiUrl)
          .then(response => {
            console.log('뉴스 응답 데이터:', response.data);
            setNews(response.data.slice(0, 3));
          })
          .catch(error => {
            console.error('뉴스 에러 발생:', error);
          });

        apiClient.get(`/api/v1/community/get?stockId=${stockId}`, {
            headers: {
                "X-AUTH-TOKEN": token,
            }
        })
          .then(response => {
            console.log('커뮤니티 응답 데이터:', response.data);
            setCommunity(response.data.slice(0, 3));
          })
          .catch(error => {
            console.error('커뮤니티 에러 발생:', error);
          });

        const stockSocket = new WebSocket("ws://127.0.0.1:8080/stock");
        stockSocket.onopen = () => {
            console.log("Stock Connected");
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



    }, [dispatch, stockId]);      

      // useState를 사용하여 Education 컴포넌트 표시 상태를 저장합니다.
        const [isEducationVisible, setIsEducationVisible] = useState(false);

        // 클릭 이벤트 핸들러를 작성합니다.
        const handleCompanyHelpClick = () => {
            setIsEducationVisible(!isEducationVisible);
        };

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

    const communityItem = community.map((item) => (
        <div className="companycommunityList">
            <div className="companycommunityProfile">
                <Profile className="companycommunityProfileImg" />
                <div className="companycommunityName">{item.name}</div>
            </div>
            <div className="companycommunityComment">{item.comment}</div>
            <div className="companycommunityReply">
                <div className="companycommunityIcons">
                    <CommentHeart className="companycommunityIcon"/>
                    <div>0</div>
                </div>
                <div className="companycommunityIcons">
                    <Comment className="companycommunityIcon"/>
                    <div>{item.replyCount}</div>
                </div>
            </div>
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
                    <div className="companyHelp" onClick={handleCompanyHelpClick}>
                        <div className="companyHelpText">
                            <Warning className="companyStockIcon"/>
                            <div>주식 차트에도 패턴이 있다는 거 알고 계신가요?</div>
                        </div>
                        <FiChevronDown className="companyStockDown"/>
                    </div>
                    {isEducationVisible && <Education className="companyEducation"/>}
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
                    <div className="companyCommunity">
                        <div className="companyCommunityText">
                            <div className="companyCommunityTitle">커뮤니티</div>
                            <Link to= {`/community/${stockId}`} style={{ textDecoration: "none" }} onClick={handleClick}>
                            <div className="companyCommunitySubtitle">더보기</div>
                            </Link>
                        </div>
                        <div className="companyCommunityList">
                            {communityItem}
                        </div>
                    </div>
                    <div className="companyTable">
                        <div className="companyTableTitle">실적 분석</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>주요재무정보</th>
                                    <th>2023.12</th>
                                    <th>2022.12</th>
                                    <th>2021.12</th>
                                    <th>2021.12</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to= {`/tbDetail1`} style={{ textDecoration: "none" }}>
                        <div className="companyHelp">
                            <div className="companyHelpText">
                                <Warning className="companyStockIcon"/>
                                <div>기업 실적 분석에 쓰이는 재무제표에 대해 알아볼까요?</div>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}