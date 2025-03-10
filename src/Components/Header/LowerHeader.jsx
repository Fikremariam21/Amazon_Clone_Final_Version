import React from 'react';
import Styles from './Header.module.css';
import { IoMenu } from "react-icons/io5";

const LowerHeader = () => {
  return (
    <div className={Styles.lower_header}>
      <ul className={Styles.nav_list}>
        <li>
          <IoMenu />
          <span>All</span>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerHeader;
