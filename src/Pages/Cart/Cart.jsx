import React, { useContext } from "react";
import styles from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from '../../Components/Products/ProductCard'
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import {Type} from '../../Utility/action.type'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Cart = () => {
  const [{basket, user}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount}, 0);
   const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item
    });
   }
   const decrement =(id) => {
      dispatch({
        type: Type.REMOVE_FROM_BASKET,
        id: id
      })
   }
  return (
    <LayOut>
      <section className={styles.cart_container}>
        <div className={styles.cart_items}>
          <h2> Hello </h2>
          <h3> Your shopping basket </h3>
          <hr/>
          {
            basket?.length === 0 ? <h3> Your basket is empty </h3> :
            basket?.map((item) => {
              return <section key={item.id} className={styles.cart_product}> 
              <ProductCard
              key={item.id} 
              product={item}
              renderDesc={true}
              renderAdd={false}
              flex={true} 
              />
              <div className={styles.btn_container}>
                <button className={styles.btn} onClick= {() => increment (item)}> 
                  <IoIosArrowUp size={20}/>
                </button>
                <span>{item.amount}</span>
                <button className={styles.btn} onClick={()=> decrement (item.id)}> 
                  <  IoIosArrowDown size={20}/>
                </button>
              </div>
              </section>
            })
          }
        </div>
        
          {basket?.length !==0&&
          <div className={styles.cart_total}>
            <div> 
            <p> Subtotal ({basket?.length} items)</p>
            <CurrencyFormat amount = {total}/>
            </div>
            <span> 
              <input type="checkbox" />
              <small> This order contains a gift </small>
            </span>
            <Link to="/Payment"> Continue to checkout </Link>
           </div>
          }
      </section>
    </LayOut>
  );
};

export default Cart;
