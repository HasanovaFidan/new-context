import React, { useContext, useEffect, useState } from 'react';
import DataContexs from '../../../context';
import "./table.css"


function Fav() {
  const { basketItems, setBasketItems } = useContext(DataContexs);
  const [totalPrice, setTotalPrice] = useState(0);

  const artir = (element) => {
    let findItem = basketItems.find((basketItem) => basketItem.id === element.id);

    if (findItem) {
      findItem.count += 1;
      setBasketItems([...basketItems]); 

    
      localStorage.setItem("basketItems", JSON.stringify([...basketItems]));
    }
  };
  const azalt = (element) => {
    let findItem = basketItems.find((basketItem) => basketItem.id === element.id);

    if (findItem) {
    
      if(findItem.count==1){
        return 
      }
      findItem.count -= 1;
      setBasketItems([...basketItems]); 

    
      localStorage.setItem("basketItems", JSON.stringify([...basketItems]));
    }
  };

 const handleDelete=(id)=>{
setBasketItems(basketItems.filter(item=>item.id!==id))
 }
  useEffect(() => {
    let sum = 0;
    basketItems.forEach(item => {
      sum -= item.price * item.count;
    });
    setTotalPrice(sum);
  }, [basketItems]);

  return (
    <div>
      <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">Price</th>
            <th scope="col">-</th>
            <th scope="col">count</th>
            <th scope="col">+</th>
            <th scope="col">delete</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {basketItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td><button className='btn btn-info' onClick={() => artir(item)}>+</button></td>
              <td>{item.count}</td>
              <td><button className='btn btn-info' onClick={() => azalt(item)}>-</button></td>
              <td><button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>sil</button></td>
              <td>{item.count*item.price}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className='td'>
        {basketItems.reduce((total,item)=>total+item.count*item.price,0)}
      </div>
    </div>
  );
}

export default Fav;
