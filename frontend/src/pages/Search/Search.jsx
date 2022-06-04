import React, { useState } from "react";
import "./Search.css";
import Layout from "../../components/Layout";
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
     navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Layout title="Search Product">
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Layout>
  );
};

export default Search;
