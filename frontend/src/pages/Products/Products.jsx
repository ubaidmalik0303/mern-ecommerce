import React, { useEffect, useState } from "react";
import "./Products.css";
import Layout from "../../components/Layout/";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts, clearErrors } from "../../store/Actions/ProductActions";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Typography, Slider } from "@mui/material";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Mobile",
    "Laptop",
    "Footware",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Accessories",
  ];

  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const alert = useAlert();
  const { keyword } = useParams();

  let count = filteredProductsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, error, alert, price, category, rating]);

  return (
    <Layout title="Products">
      <h2 className="productsHeading">Products</h2>

      <div className="filterBox">
        <Typography>Price: </Typography>
        <Slider
          value={price}
          onChange={(event, newPrice) => {
            setCurrentPage(1);
            setPrice(newPrice);
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={200000}
        />
        <Typography>Category: </Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => {
                setCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
        <fieldset>
          <Typography component="legend">Rating Above</Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => {
              setRating(newRating);
              setCurrentPage(1);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="continuous-slider"
            min={0}
            max={5}
          />
        </fieldset>
      </div>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="products">
            {products[0] ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <h2>No Product Found!</h2>
            )}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              {productCount && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              )}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Products;
