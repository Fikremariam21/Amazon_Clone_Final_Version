
import React from "react";
import { MdLanguage } from "react-icons/md";
import styles from "./Footer.module.css";
import {Link} from 'react-dom'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Back to top */}
      <div className={styles.backToTop}>
        <a href="#top">Back to top</a>
      </div>

      {/* Footer Links */}
      <div className={styles.footerLinks}>
        <div className={styles.column}>
          <h4>Get to Know Us</h4>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">About Amazon</a>
          <a href="#">Investor Relations</a>
          <a href="#">Amazon Devices</a>
          <a href="#">Amazon Science</a>
        </div>
        <div className={styles.column}>
          <h4>Make Money with Us</h4>
          <a href="#">Sell on Amazon</a>
          <a href="#">Sell on Amazon Business</a>
          <a href="#">Sell apps on Amazon </a>
          <a href="#">Become an Affiliate</a>
          <a href="#">Advertise Your Products</a>
          <a href="#">Self-Publish with Us</a>
          <a href="#">Host an Amazon Hub</a>
          <a href="#">See More</a>
        </div>
        <div className={styles.column}>
          <h4>Amazon Payment Products</h4>
          <a href="#">Amazon Business Card</a>
          <a href="#">Shop with Points</a>
          <a href="#">Reload Your Balance</a>
          <a href="#">Amazon Currency Converter</a>
        </div>
        <div className={styles.column}>
          <h4>Let Us Help You</h4>
          <a href="#">Amazon and COVID-19</a>
          <a href="#">Your Account</a>
          <a href="#">Your Orders</a>
          <a href="#">Shipping Rates & Policies</a>
          <a href="#">Returns & Replacements</a>
          <a href="#">Manage Your Content and Devices</a>
          <a href="#">Help</a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.footer__container}>
        <div className={styles.bottomFooter}>
          <a href="/" className={styles.amazonLogoLink}>
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </a>

          <div className={styles.options}>
            <button className={styles.btn__language}>
              {" "}
              <MdLanguage size={15} className={styles.svg} />{" "}
              <span> English</span>
            </button>
            <button className={styles.usd}> $ USD - U.S. Dollar</button>
            <button className={styles.country}>
            <img
            src="https://flagcdn.com/w40/us.png"  // Or the URL to your flag image
            alt="United States Flag"
            className={styles.flag}
          />
              <span> United States</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
