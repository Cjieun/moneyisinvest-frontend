import React, {useState} from "react";
import "./BuyList.scss";
//import axios from "axios";
import Header from "systems/Header";
import Profile from "systems/Profile";
import Footer from "components/Footer";
import Button from "components/Button";

export default function BuyList() {
    const [buy, setBuy] = useState([
        {
            image: "",
            product: "감자커피",
            price: "1",
            date: "2023.12.12.금",
        },
        {
            image: "",
            product: "커피",
            price: "10",
            date: "2023.8.4.금",
        },
        {
            image: "",
            product: "쌀",
            price: "100",
            date: "2023.8.4.금",
        },
        {
            image: "",
            product: "스타벅스 아메리카노 (Tall)",
            price: "2250",
            date: "2023.8.4.금",
        },
        {
            image: "",
            product: "스타벅스 아메리카노 (Tall)",
            price: "22500",
            date: "2023.8.4.금",
        },
        {
            image: "",
            product: "스타벅스 아메리카노 (Tall)",
            price: "2250",
            date: "2023.8.4.금",
        },
        {
            image: "",
            product: "스타벅스 아메리카노 (Tall)",
            price: "2250",
            date: "2023.8.4.금",
        },

    ]);

    const handleDeleteItem = (index) => {
        const updatedBuy = [...buy];
        updatedBuy.splice(index, 1);
        setBuy(updatedBuy);
    };

    const buyItem = buy.map((item, index) => (
        <div className="buyItems" keys={index}>
           <div className="buyItem-title">
                <img alt="상품" className="buyItem-image"></img>
                <div className="buyItem-product">{item.product}</div>
            </div>
            <div className="buyItem-content">
                <div className="buyItem-price">{item.price}스톡</div>
                <div className="buyItem-date">{item.date}</div>
                <div className="buyItem-button" onClick={() => handleDeleteItem(index)}><Button state="interest"/></div>
            </div>
        </div>
    ))

    return (
        <div className="buyContainer">
            <Header />
            <div className="buyBox">
                <div className="buyContent">
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="buyProfile">
                        <div className="buyTitle">거래 내역
                        </div>
                        <div className="buyInfo">
                            <div className="buyInfo-top">
                                <div className="buyInfo-title">
                                    <div className="buyInfo-image"></div>
                                    <div className="buyInfo-product">상품명</div>
                                </div>
                                <div className="buyInfo-content">
                                    <div className="buyInfo-price">교환가</div>
                                    <div className="buyInfo-date">구매일자</div>
                                    <div className="buyInfo-delete">구매취소</div>
                                </div>
                            </div>
                            <div className="buyInfo-scrollable">
                                {buyItem}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>  
    )  
}