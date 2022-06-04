import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import "./Home.css";
import { CgMouse } from "react-icons/all";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../store/Actions/ProductActions";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Layout>
      <div className="banner">
        <p>Welcome To Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h1 className="home-heading">Featured Products</h1>
      <div className="container" id="container">
        {loading ? (
          <LoadingAnimation />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Home;
