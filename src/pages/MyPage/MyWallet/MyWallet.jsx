import React, {useState, useEffect} from "react";
import "./MyWallet.scss";
import Header from "../../../systems/Header";
import Footer from "components/Footer";
import Profile from "../../../systems/Profile";
import {ReactComponent as Wallet} from "../../../assets/images/wallet-bifold.svg";
import {ReactComponent as Right1} from "../../../assets/images/화살표 민트.svg"
import {ReactComponent as Right2} from "../../../assets/images/화살표 검정.svg";
import axios from "axios";

export default function MyWallet() {

    const apiClient = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    const [walletAddress, setWalletAddress] = useState("");
    const [walletInfo, setWalletInfo] = useState({});
    const [wallet, setWallet] = useState([])

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
            console.log("wallet data:",res.data);
            setWalletInfo(res.data);
        }).catch((err)=> {
            console.log(err);
        })

        apiClient.get("/api/v1/coin/get/history", {
            headers: {
                'X-AUTH-TOKEN': token,
            }
        }).then((res) => {
            console.log("wallet dealData: ",res.data);
            setWallet(res.data);
        }).catch((err)=> {
            console.log("wallet dealData error: ",err);
        })
    },[token])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    };

    const formattedDate = formatDate(walletInfo.createdAt);

    const WalletModal = ({item, style}) => (
        <div className="walletModal" style={style}>
            <div className="walletModal-items">
                <div className="walletModal-title">거래 번호</div>
                <div className="walletModal-content">{item.hashCode}</div>
            </div>
            <div className="walletModal-items">
                <div className="walletModal-title">보낸 주소</div>
                <div className="walletModal-content">{item.recipient}</div>
            </div>
            <div className="walletModal-items">
                <div className="walletModal-title">받는 주소</div>
                <div className="walletModal-content">{item.sender}</div>
            </div>
            <div className="walletModal-items">
                <div className="walletModal-title">수수료</div>
                <div className="walletModal-content">{item.fee}</div>
            </div>
            <div className="walletModal-items">
                <div className="walletModal-title">순거래가</div>
                <div className="walletModal-content">{item.amount}</div>
            </div>
        </div>
    );

    const [modalPosition, setModalPosition] = useState({});
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const walletItem = wallet.map((item, index) => {
        const formattedDate2 = item.datetime.replace(/-/g,'.');
        return (
        <div className="myWalletItem-top"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={(e) => {
                setModalPosition({ top:e.clientY + 'px',left:e.clientX + 'px'});
            }}
        >
            <div className="myWalletItem-dealNum">{item.hashCode}</div>
            <div className="myWalletItem-deal">
                <div className="myWalletItem-receiver">{item.recipient}</div>
                <Right2 />
                <div className="myWalletItem-caller">{item.sender}</div>
            </div>
            <div className="myWalletItem-price">{item.total}스톡</div>
            <div className="myWalletItem-date">{formattedDate2}</div>
            <div className={`myWalletItem-state ${item.type === '입금' ? 'red' : item.type === '출금' ? 'blue' : ''}`}>{item.type}</div>
            {hoveredIndex === index && <WalletModal item={item} style={modalPosition}/>}
        </div>
    )})

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
                                <div className="myWalletInfo-infoContent">{formattedDate}</div>
                            </div>
                            <div className="myWalletInfo-info">
                                <div className="myWalletInfo-infoTitle">보유 스톡</div>
                                <div className="myWalletInfo-infoContent">{walletInfo.balance}스톡</div>
                            </div>
                            <div className="myWalletInfo-info">
                                <div className="myWalletInfo-infoTitle">환산액</div>
                                <div className="myWalletInfo-infoContent">{walletInfo.won}원</div>
                            </div>
                        </div>
                        <div className="myWalletInfo-table">
                            <div className="myWalletInfo-top">
                                <div className="myWalletInfo-dealNum">거래번호</div>
                                <div className="myWalletInfo-dealContent">
                                    <div className="myWalletInfo-deal">
                                        <div>발신자</div>
                                        <Right1 />
                                        <div>수신자</div>
                                    </div>
                                    <div className="myWalletInfo-price">총거래가</div>
                                    <div className="myWalletInfo-date">거래 일시</div>
                                </div>
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
