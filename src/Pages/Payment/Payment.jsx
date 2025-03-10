import React, { useContext, useState } from "react";
import styles from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Components/API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import {Type} from '../../Utility/action.type'


const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItems = basket?.reduce((amount, item) => item.amount + amount, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate= useNavigate();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // Step One
      // Contact the backend function to get the client-secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = response.data?.clientSecret;

      // Step Two
      // It will confirm client side(react-side) to use the stripe

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // confirmation completed
      //**********************//
      // Step Three
      // After the confirmation, we will save the item inside the basket on firebase server and clear the basket
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // Empty the basket
        //****************//

        dispatch({ type: Type.EMPTY_BASKET})


      setProcessing(false);
      navigate('/orders', {state:{img: "You have placed new order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* Header */}
      <div className={styles.payment_header}>
        Checkout ({totalItems}) items{" "}
        {/*to make the item number dynamic, we will import our basket. In our case the basket is found in DataContext. Then we will import useContext */}
      </div>
      {/* Payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3> Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Tabor Sub-City</div>
            <div> Hawassa, Ethiopia</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={styles.flex}>
          <h3> Review Items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={styles.flex}>
          <h3> Payment Method</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError} </small>
                )}

                {/* Card Element */}
                <CardElement onChange={handleChange} />

                {/* Price */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "5px" }}>
                      <p> Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loader}>
                        <ClipLoader color="gray" size={12} />
                        <p> Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
