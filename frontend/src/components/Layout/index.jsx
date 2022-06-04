import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Foorter";
import MetaData from "./MetaData/MetaData";
import UserOptions from "./UserOptions/UserOptions";
import { useSelector } from "react-redux";

const Layout = ({ children, title }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title={title} />
      <Header />
      {!loading && isAuthenticated && <UserOptions user={user} />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
