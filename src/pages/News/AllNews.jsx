import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.scss";
import Header from "systems/Header";
import Footer from "components/Footer";

export default function AllNews() {
  const apiClient = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : undefined,
  });

  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiUrl = `/api/v1/stock/get/news/all`;
    apiClient
      .get(apiUrl)
      .then((response) => {
        console.log("News Data:", response);
        setNews(response.data);
      })
      .catch((error) => {
        console.error("News Data error:", error);
      });
  }, []);

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
          <div className="newsTitle">전체 뉴스</div>
          <div className="newsInfo">
            <div className="newsInfo-scrollable">{newsItem}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
