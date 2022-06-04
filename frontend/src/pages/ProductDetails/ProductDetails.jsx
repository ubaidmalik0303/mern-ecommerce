import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  clearErrors,
} from "../../store/Actions/ProductActions";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);
  const alert = useAlert();

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <Layout title={product.name}>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="productDetails">
            <div>
              <Carousel className="mainCarousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>PKR: {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button>Add To Cart</button>
                </div>

                <p>
                  Status:{" "}
                  <b
                    className={product.stock < 1 ? "redCO=olor" : "greenColor"}
                  >
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Discription: <p>{product.discription}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((item, i) => (
                  <ReviewCard key={i} review={item} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet.</p>
          )}
        </>
      )}
    </Layout>
  );
};

export default ProductDetails;
