import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.scss";
import Header from "systems/Header";
import Footer from "components/Footer";
import { useParams, useLocation } from "react-router-dom";

export default function News() {
  const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
  });  

  const { stockId } = useParams(); // URL로부터 supportId를 가져옵니다.

  const [companyName, setCompanyName] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    // GET 요청을 보낼 URL 설정 (query parameter 포함)
    const apiUrl = `/api/v1/stock/get/news?stockId=${stockId}`;

    apiClient
      .get(`/api/v1/stock/get/name?stockId=${stockId}`)
      .then((response) => {
        console.log("News name:", response.data);
        setCompanyName(response.data);
      })
      .catch((error) => {
        console.error("News name error: ", error);
      });

    apiClient
      .get(apiUrl)
      .then((response) => {
        console.log("News Data:", response.data);
        setNews(response.data);
      })
      .catch((error) => {
        console.error("News Error:", error);
      });
  }, [stockId]);

  const newsItem = news.map((item) => (
    <div className="newsList">
      <div className="newsItems" onClick={() => window.open(item.newsUrl)}>
        <div className="newsItemCompany">{item.newsCompany}</div>
        <div className="newsItemTitle">{item.newsTitle}</div>
        <div className="newsItemContent">{item.newsPreview}</div>
      </div>
      <img alt="썸네일" src={item.newsThumbnail} className="newsImage" />
    </div>
  ));

  return (
    <div className="newsContainer">
      <Header />
      <div className="newsBox">
        <div className="newsContent">
          <div className="newsTitle">{companyName} 뉴스</div>
          <div className="newsInfo">
            <div className="newsInfo-scrollable">{newsItem}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
