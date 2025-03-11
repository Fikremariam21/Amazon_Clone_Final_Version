import React, { useContext, useState, useEffect } from "react";
import styles from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from '../../Components/Products/ProductCard'

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={`${styles.container}`}>
        <div className={`${styles.order__container}`}>
          <h2>Your Orders </h2>
          { orders?.length == 0 && <div> You don't have orders. </div>}
          {/* Ordered Items Starts here */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p className={styles.orderId}> Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return <ProductCard
                    product={order}
                    flex={true}
                    key={order.id}
                    />;
                  })}
                </div> 
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};
export default Orders;
