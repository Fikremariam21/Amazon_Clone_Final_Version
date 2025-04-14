import React, { useContext, useState, useEffect, useRef } from "react";
import styles from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from '../../Components/Products/ProductCard'

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3);
  const ordersContainerRef = useRef(null);

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
  }, [user]);

  // Scroll to top when page changes
  useEffect(() => {
    if (ordersContainerRef.current) {
      ordersContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <LayOut>
      <section className={`${styles.container}`} ref={ordersContainerRef}>
        <div className={`${styles.order__container}`}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <div>You don't have any orders.</div>}
          
          <div>
            {currentOrders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p className={styles.orderId}>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard
                    product={order}
                    flex={true}
                    key={order.id}
                  />
                ))}
              </div>
            ))}
          </div>

          {orders.length > ordersPerPage && (
            <div className={styles.pagination}>
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={currentPage === index + 1 ? styles.active : ''}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;