import React, { useState } from 'react';
import "./Store.scss";
/** @jsxImportSource @emotion/react */
import Header from 'systems/Header';
/**import Button from "components/Button"; */
import Footer from "components/Footer";
import {ReactComponent as Search} from "../../assets/images/search.svg";

const productsList = [
  {
    id: 1,
    name: 'Product 1',
    price: 10000,
    image: 'https://via.placeholder.com/68x68'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 15000,
    image: 'https://via.placeholder.com/68x68'
  },
  {
    id: 3,
    name: 'Product 3',
    price: 13000,
    image: 'https://via.placeholder.com/68x68'
  }
];


const Store = () => {
    const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const onBuy = () => {
    alert("구매가 완료되었습니다!");
    setCart([]);
  };

  return (
    <div className='storeContainer'>
    <Header/>
    <div className='storeTitle'>상점
      <div className="StoreSearch">
        <input type="text"/>
        <div><Search/></div>
      </div>
    </div>
    <div className="row-container">
      <div className="userCart">
        <div className="usercart-text">님이 담은 상품이에요 ({cart.length})</div>
        {cart.length > 0 && (
          <div className="cart-section">
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index}>
                  <img className='item-img' src={item.image} alt={item.name} />
                  {item.name} - {item.price.toLocaleString()} 스톡
                </li>
              ))}
            </ul>
            <div>
              총합
              {cart.reduce((total, item) => total + item.price, 0).toLocaleString()} 스톡
              </div>
            <button  className='cartBuy-btn' onClick={onBuy}>구매하기</button>
          </div>
        )}
      </div>

      <table className="products-table">
        <thead>
            <tr>
            <th></th>
            <th>상품명</th>
            <th>교환가</th>
            <th>장바구니</th>
            </tr>
        </thead>
        <tbody>
            {productsList.map((product) => (
            <tr key={product.id} className="product-item">
                <td>
                <img className='product-img' src={product.image} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()}스톡</td>
                <td>
                <button onClick={() => addToCart(product)}>장바구니</button>
                <button onClick={onBuy}>구매하기</button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    </div>
    <Footer/>

    </div>
  );
};

export default Store;
