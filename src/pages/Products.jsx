import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import "swiper/css/navigation";

import "../css/slidehome.css";

// import required modules
import { Scrollbar, Navigation } from "swiper/modules";

function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [count, setCount] = useState(0);
  const [totalItemCart, setTotalItemCart] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  let params = queryString.parse(location.search);

  const [queryParams, setQueryParams] = React.useState(() => ({
    ...params,
    limit: Number.parseInt(params.limit) || 4,
  }));

  const getValue = async () => {
    if (params.name) {
      fetch(
        `https://students.trungthanhweb.com/api/getSearchProducts?apitoken=${token}&name=${params.name}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.result.length > 0) {
            setCount(result.result.length);
            setProducts(result.result.splice(0, params.limit));
          }
        });
    } else {
      if (params.limit) {
        fetch(
          `https://students.trungthanhweb.com/api/home1?apitoken=${token}&limit=${params.limit}`
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.products.length > 0) {
              setProducts(result.products);

              setCount(result.count);
            }
          });
      }
    }
  };
  useEffect(() => {
    navigate(`?${queryString.stringify(queryParams)}`);
  }, []);

  useEffect(() => {
    getValue();
  }, [location.search]);

  const handleBtnMore = () => {
    const newFilter = {
      ...params,
      limit: Number(params.limit) + 4,
    };
    navigate(`?${queryString.stringify(newFilter)}`);
  };

  const handleClick = (id) => {
    setTotalItemCart(id);
  };

  return (
    <div className="home">
      <div>
        <Navbar settotal={totalItemCart}></Navbar>
        <div className="">
          <Swiper
            navigation={true}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src="./image/image1.png" alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./image/image2.png" alt="img" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./image/image3.png" alt="img" />
            </SwiperSlide>
          </Swiper>
        </div>
        <h3 className="mt-5 mb-5 text-center">Sản phẩm</h3>

        <div className="container-md containerProduct mt-3">
          <div className="row pb-5">
            {params.name ? (
              <Product
                handleClick={handleClick}
                image={true}
                result={products}
                classGrid="col-sm-4 col-md-3"
              ></Product>
            ) : (
              <Product
                handleClick={handleClick}
                result={products}
                classGrid="col-sm-4 col-md-3"
              ></Product>
            )}
          </div>
          {params.limit < count && (
            <div className="text-center mt-5 mb-5">
              <button
                type="button"
                className="btn btn-info ps-5 pe-5"
                style={{ marginBottom: "50px" }}
                onClick={handleBtnMore}
              >
                Xem Thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
