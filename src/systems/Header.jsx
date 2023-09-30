import React, { useEffect, useState, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { ReactComponent as Search } from "../assets/images/search.svg";
import { ReactComponent as Coin } from "../assets/images/coin.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
  });  

  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      // sessionStorage 에 token 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
      setProfileName(sessionStorage.getItem("name"));
      
      const fetchData = async () => {
        try {
          const profileResponse = await apiClient.get("/api/v1/profile/get", {
            headers: { "X-AUTH-TOKEN": token },
          });
          console.log("header profile success", profileResponse.data);
          setProfileImage(profileResponse.data.url);

          const stockResponse = await apiClient.get("/api/v1/coin/get/balance", {
            headers: { "X-AUTH-TOKEN": token },
          });
          console.log("header stock success", stockResponse.data);
          setStock(stockResponse.data);
        } catch (error) {
          if (error && (error.response.status === 500 || error.response.status === 401)) { // If the response status was 401 Unauthorized
            try{
              // Refresh the access token using the refresh token
              const refreshTokenResult = await apiClient.post("/api/v1/refresh-token", 
                { 
                  refreshToken: sessionStorage.getItem("refresh-token"),
                }
              );
              
              if(refreshTokenResult.status === 200){
                // Save new access and refresh tokens to session storage
                sessionStorage.setItem('token', refreshTokenResult.data.accessToken); 
                
                window.location.reload(); // Reload page to apply new tokens for API calls
                
              } else throw Error(refreshTokenResult.statusText);  
            } catch(err){
              console.error(err.message); 
              setIsLogin(false);
              sessionStorage.clear();
              alert("자동 로그아웃 되었습니다!");
              window.location.href = "/signIn";
            }
            
          } else console.error(error || 'refresh-token API request failed.');
        }
      };
      
      fetchData();
      
    } else {
      // sessionStorage 에 token 라는 key 값으로 저장된 값이 없다면
      setIsLogin(false);
    }
}, [profileImage, profileName]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultRef = useRef();

  useEffect(() => {
    //검색어가 없으면 결과를 비움
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const fetchData = async () => {
      try {
        // API 호출을 통해 검색 결과를 가져옵니다.
        const response = await apiClient.get("/api/v1/stock/search", {
          params: { keyword: searchTerm }, // keyword 파라미터로 수정했습니다.
        });
        console.log(response.data);
        setSearchResults(response.data); // 결과를 state에 저장합니다.
      } catch (error) {
        console.error("검색 중 오류가 발생했습니다.", error);
      }
    };

    // debounce 처리를 통해 API 호출을 제한합니다.
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (
      searchResultRef.current &&
      !searchResultRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mosedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const headerContainer = css`
    position: sticky;
    top: 0;
    flex-shrink: 0;
    fill: rgba(255, 255, 255, 0.19);
    background-blend-mode: overlay;
    backdrop-filter: blur(20px);
    z-index: 999;
  `;
  const header = css`
    flex-shrink: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 61.625rem;
    height: 3.875rem;
    align-items: center;
  `;
  const logo = css`
    width: 9.375rem;
    height: 3.125rem;
    flex-shrink: 0;
    margin: auto 0;
    display: flex;
    align-items: center;
  `;
  const nav = css`
    display: inline-flex;
    align-items: flex-start;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: ${isLogin ? "1.56rem" : "2.37rem"};
    margin-right: ${isLogin ? "1.56rem" : "2.44rem"};
    gap: ${isLogin ? "3.25rem" : "5rem"};
  `;
  const item = css`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
  `;
  const searchContainer = css`
    display: flex;
    flex-direction: column;
    position: relative;
  `;
  const searchBox = css`
    width: ${isLogin ? "16.0625rem" : "17.25rem"};
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #f1f1f1;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: ${isLogin ? "0.99rem" : "2rem"};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;
  const search = css`
    color: #000;
    margin: auto 1.25rem;
    background-color: #f1f1f1;
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    &::placeholder {
      color: #b0b0b0;
      font-size: 0.75rem;
      font-weight: 500;
    }
  `;
  const searchLogo = css`
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    margin: auto 0.94rem auto 0;
  `;
  const searchResultsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100%;
  width: 76%;
  min-height: auto;
  max-height: 15rem;
  overflow: scroll;
  background-color: #fff;
  border-radius: 0 0 0.625rem 0.625rem;
  z-index: -1;
  margin: auto 1.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  padding-top: 0;
  &::-webkit-scrollbar {
    width: 0;
  }
  & > div:not(:last-child) {
    width: 100%;
    border-bottom: 1px solid #d1efee;
  }
  `;  
  const searchResultsItem = css`
    height: 2.5rem;
    width: 100%;
    padding: 0.81rem 0 0.81rem 1.06rem;
    font-size: 0.75rem;
    color: #797979;
    font-weight: 500;
  `;
  const login = css`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.94rem auto 0;
    flex-shrink: 0;
    display: ${isLogin ? "none" : "block"};
  `;
  const coin = css`
    display: ${isLogin ? "block" : "none"};
    color: #3eb7af;
    font-size: 0.8125rem;
    font-weight: 600;
    margin: auto 0.19rem auto 0;
  `;
  const coinLogo = css`
    display: ${isLogin ? "block" : "none"};
    width: 1.838rem;
    height: 1.89344rem;
    margin: auto 0.69rem auto 0;
  `;
  const profile = css`
    display: flex;
    flex-direction: row;
  `;
  const nickname = css`
    display: ${isLogin ? "block" : "none"};
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    margin: auto 0.37rem auto 0;
  `;
  const headerprofile = css`
    display: ${isLogin ? "block" : "none"};
    width: 2.25rem;
    height: 2.25rem;
    margin: auto 0;
    border-radius: 50%;
  `;

  return (
    <div css={headerContainer}>
      <div css={header}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo css={logo} onClick={() => window.scrollTo(0, 0)}/>
        </Link>
        <div css={nav}>
          <Link to="/allNews" style={{ textDecoration: "none" }}>
            <div css={item}>뉴스</div>
          </Link>
          <Link to="/Textbook" style={{ textDecoration: "none" }}>
            <div css={item}>교과서</div>
          </Link>
          <Link to="/Store" style={{ textDecoration: "none" }}>
            <div css={item}>상점</div>
          </Link>
          <Link to="/pay" style={{ textDecoration: "none" }}>
            <div css={item}>프리미엄</div>
          </Link>
        </div>
        <div css={searchContainer}>
          <div css={searchBox}>
            <input
              css={search}
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>
            <Search css={searchLogo} />
          </div>
          {searchResults.length > 0 && (
            <div ref={searchResultRef} css={searchResultsContainer}>
              {searchResults.map((result) => (
                <div key={result.stockId} css={searchResultsItem}>
                  <Link
                    to={`/company/${result.stockId}`}
                    style={{ textDecoration: "none", color: "#797979" }}
                  >
                    {result.stockName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link 
          to="/signIn" 
          state={{ from: location.pathname }} 
          style={{ textDecoration: "none" }} 
          css={login}
        >          
          <div>로그인</div>
        </Link>
        <Link to="/myWallet" style={{ textDecoration: "none" }}>
        <div css={coin}>{stock} 스톡</div>
        </Link>
        <Coin css={coinLogo} />
        <Link to="/mypage" style={{ textDecoration: "none" }} css={profile}>
          <div css={nickname}>{profileName}</div>
          <img alt="profile" src={profileImage} css={headerprofile} />
        </Link>
      </div>
    </div>
  );
}
