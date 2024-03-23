import React from "react";
import "./StoreBag.scss";

const StoreBagTypeOne = () => {
  return (
    <div className="StoreBagFrame">
      <div className="TypeOneTextOneBox">
        <p className="TypeOneTextOne">
          아직 장바구니에 <br />
          담은 상품이 없어요.
        </p>
      </div>
      <div className="TypeOneTextTwoBox">
        <p className="TypeOneTextTwo">
          투자가 머니에서 준비한 <br />
          상품을 주식 거래로 모은
          <br /> 스톡 코인으로 교환해 보세요!
        </p>
      </div>
    </div>
  );
};

const BagItem = (props) => {
  return (
    <div className="BagItemFrame">
      <div className="ItemImg">
        <img src={`/img/${props.ItemImg}.svg`} alt="컵 이미지" />
      </div>
      <div className="ItemInformationBox">
        <p className="ItemName">{props.ItemName}</p>
        <p className="ItemPrice">{props.ItemPrice} 스톡</p>
      </div>
    </div>
  );
};

const StoreBagTypeTwo = (props) => {
  return (
    <div className="StoreBagFrameTwo">
      <p className="TypeTwoTextOne">
        {props.UserName}님이 <br />
        담은 상품이에요
      </p>
      <BagItem
        ItemName="스타벅스 아메리카노 (Tall)"
        ItemPrice="2,250"
        ItemImg="cup"
      ></BagItem>
      <BagItem
        ItemName="아이패드 에어 5세대"
        ItemPrice="450,000"
        ItemImg="Ipad"
      ></BagItem>
      <div className="Line"></div>
      <div className="TotalFrame">
        <p className="TotalText">총합</p>
        <p className="TotalPriceText">{props.TotalPrice}스톡</p>
      </div>
      <button className="BuyButton">
        <p className="BuyButtonText">구매하기</p>
      </button>
    </div>
  );
};

const StoreBagPage = () => {
  return (
    <div className="StoreBagPage">
      <StoreBagTypeOne />
      <StoreBagTypeTwo UserName="김찬주" TotalPrice="452,250"></StoreBagTypeTwo>
    </div>
  );
};

export default StoreBagPage;
