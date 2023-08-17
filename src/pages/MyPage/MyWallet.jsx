import React, {useState, useEffect} from "react";
import "./MyWallet.scss";
import Header from "../../systems/Header";
import Footer from "components/Footer";
import Profile from "../../systems/Profile";
import MyButton from "../../components/Button";
import {ReactComponent as Wallet} from "../../assets/images/wallet-bifold.svg";
import {ReactComponent as Right1} from "../../assets/images/화살표 민트.svg"
import {ReactComponent as Right2} from "../../assets/images/화살표 검정.svg";
import axios from "axios";

export default function MyWallet() {


    const [wallet] = useState([
        {
        code: "Aaaaaaaaaaa",
        receive: "aaaaaaaaaaaa",
        caller: "aaaaaaaaaaaa",
        price: "5,000스톡",
        date: "2023.12.11.",
        state: "입금"
        }
])

    const apiClient = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const [walletAddress, setWalletAddress] = useState("");

    const token = sessionStorage.getItem("token");
    useEffect (() => {
        apiClient.get("/api/v1/coin/get/address", {
            headers: {
                'X-AUTH-TOKEN': token
            }
        }).then((res) => {
            console.log(res.data);
            setWalletAddress(res.data);
        },).catch((err)=> {
            console.log(err);
        })

        apiClient.get("/api/v1/coin/get/info", {
            headers: {
                'X-AUTH-TOKEN': token
            }
        }).then((res) => {
            console.log("지갑 정보 조회",res.data);
        }).catch((err)=> {
            console.log(err);
        })
    },[])

    const walletItem = wallet.map((item) => (
        <div className="myWalletItem-top">
            <div className="myWalletItem-dealNum">{item.code}</div>
            <div className="myWalletItem-deal">
                <div className="myWalletItem-receiver">{item.receive}</div>
                <Right2 />
                <div className="myWalletItem-caller">{item.caller}</div>
            </div>
            <div className="myWalletItem-price">{item.price}</div>
            <div className="myWalletItem-date">{item.date}</div>
            <div className="myWalletItem-state">{item.state}</div>
        </div>
    ))

    return (
        <div className="myWalletContainer">
            <Header />
            <div className="myWalletBox">
                <div className="myWalletContent">
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="myWalletProfile">
                        <div className="myWalletTitle">내 지갑</div>
                        <div className="myWalletInfo">
                            <div className="myWalletInfo-address">
                                <div className="myWalletInfo-addressBox">
                                    <Wallet className="myWalletInfo-addressImg" />
                                    <div className="myWalletInfo-addressText">나의 지갑 주소</div>
                                </div>
                                <div className="myWalletInfo-addressInfo">{walletAddress}</div>
                            </div>
                            <div className="myWalletInfo-info">
                                <div className="myWalletInfo-infoTitle">지갑 생성일</div>
                                <div className="myWalletInfo-infoContent">2023.08.11</div>
                            </div>
                            <div className="myWalletInfo-info">
                                <div className="myWalletInfo-infoTitle">보유 스톡</div>
                                <div className="myWalletInfo-infoContent">100스톡</div>
                            </div>
                            <div className="myWalletInfo-info">
                                <div className="myWalletInfo-infoTitle">환산액</div>
                                <div className="myWalletInfo-infoContent">10,000원</div>
                            </div>
                        </div>
                        <div className="myWalletInfo-table">
                            <div className="myWalletInfo-top">
                                <div className="myWalletInfo-dealNum">거래번호</div>
                                <div className="myWalletInfo-deal">
                                    <div>수신자</div>
                                    <Right1 />
                                    <div>발신자</div>
                                </div>
                                <div className="myWalletInfo-price">총거래가</div>
                                <div className="myWalletInfo-date">거래 일시</div>
                                <div>입출금</div>
                            </div>
                            <div className="myWalletInfo-content">
                            {walletItem}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
