import React, { useContext, useEffect } from 'react';
import "./cards.css";
import { Link } from 'react-router-dom';
import { MdOutlineFavorite, MdRestartAlt } from "react-icons/md";
import { CiHeart } from 'react-icons/ci';
import DataContext from '../../../context';

function Card({ item }) {
  const { basketItems, setBasketItems,data,setData } = useContext(DataContext);

  const handleBasket = (item) => {
    let findItem = basketItems.find((basketItem) => basketItem.id === item.id);
    if (!findItem) {
      item.count = 1;
      setBasketItems([...basketItems, item]);
    } else {
      item.count += 1;
      setBasketItems([...basketItems.filter(basketItem => basketItem.id !== item.id), item]);
    }
  };

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }, [basketItems, setBasketItems]);

  return (
    <div>
      <div className="cart">
        <img src={item.thumbnail} alt="" />
        <div className="hover__div">
          <h5>Add to cart</h5>
          <div className="di">
            <CiHeart />
            <MdRestartAlt />
          </div>
        </div>
        <Link to={`/${item.id}`}>
          <h3>{item.title}</h3>
        </Link>
        <p>{item.price}$</p>
        <div className="flexo">
          <MdOutlineFavorite />
          <button onClick={()=>handleBasket(item)} className='favo'>Add</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
