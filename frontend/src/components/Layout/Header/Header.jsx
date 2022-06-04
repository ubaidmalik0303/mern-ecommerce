import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../assets/logo.png";


const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#eb4034"
      burgerColorHover="#a62d24"
      logo={logo}
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="grey"
      navColor1="white"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      profileIconUrl="/login"
      link1Size="1.5vmax"
      link1Color="rgba(35, 35, 35, 0.7)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link2ColorHover="#eb4034"
      link3ColorHover="#eb4034"
      link4ColorHover="#eb4034"
      link2Margin="1vmax"
      profileIconColor="rgba(35, 35, 35, 0.8)"
      searchIconColor="rgba(35, 35, 35, 0.8)"
      cartIconColor="rgba(35, 35, 35, 0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
    />
  );
};

export default Header;
