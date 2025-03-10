import React, { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/firebase'
 
 

const Header = () => {
 const [{ user, basket}, dispatch]= useContext(DataContext) 
  const totalItems = basket.reduce((amount, item) => item.amount + amount, 0); // Total items quantity in the basket/regardless of the item

  return (
    <div className={classes.outer_wrapper}>
      <section>
        <div className={classes.header_container}>
          {/* Logo section */}

          <div className={classes.logo_container}>
            {/* Logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            {/* Delivery Section */}
            {/*Icon */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p> Delivered to</p>
                <span> Ethiopia </span>
              </div>
            </div>
          </div>
           {/* Search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text"/>
               <BsSearch size= {37}/>
            </div>
            {/* Right Side */}

            <div className= {classes.order_container}> 
                <Link to="" className={classes.language}> 
                    <img src=" https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US flag"/>

                <select name="" id="">
                    <option value="">EN</option>
                </select> 
                </Link>
                 <Link to={!user && "/auth"}> {/* redirect log in page, if no logged in user */}

                <div> 
                  {
                    user? ( 
                      <> 
                      <p> Hello {user?.email?.split("@")[0]} </p>
                      <span onClick={() => auth.signOut()}>
                        Sign Out </span> 
                      </>
                    ): (
                      <> 
                      <p> Hello, Sign In</p>
                      <span>Account & Lists</span> 
                      </>
                    )
                  }
                </div>
                </Link>
                <Link to="/orders"> 
                    <p>Returns</p>
                    <span>& Orders</span>
                </Link>
                <Link to="/cart" className={classes.cart}> 
                    <BiCart size={25}/>
                    <span>{totalItems}</span>
                </Link>
            </div>
          </div>
      </section>
      <LowerHeader/>
    </div>
  );
};

export default Header;