import React from "react";
import playStore from "../../../assets/playstore.png";
import appStore from "../../../assets/appstore.png";
import "./footer.css";

const Foorter = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App For Android And IOS Mobile</p>
        <img src={playStore} alt="Play Store" />
        <img src={appStore} alt="App Store" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality Is Our First Priority</p>
        <p>Copyrights 2022 &copy; Ubaid Malik</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="facebook.com">Facebook</a>
        <a href="instagram.com">Instagram</a>
        <a href="twitter.com">Twitter</a>
      </div>
    </footer>
  );
};

export default Foorter;
