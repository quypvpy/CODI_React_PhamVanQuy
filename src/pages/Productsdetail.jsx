import React, { useEffect, useState } from "react";

import { Link, Route, Routes, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../css/styles.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Description from "../components/Description";
import SampleProducts from "../components/SampleProducts";
import Navbar from "../components/Navbar";
import { GetData } from "../redux/detailSlice";

import Swal from "sweetalert2";

function Productsdetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [background, setBackground] = useState(0);
  const [totalItemCart, setTotalItemCart] = useState(0);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    dispatch(GetData(id));
  }, []);

  // chúng ta phải lấy mảng để kiếm tra đầu vào render khỏi bị lỗi
  const { details } = useSelector((state) => state.detail);

  var products = details.products;
  var gallery = details.gallery;

  const AddBackground1 = () => {
    setBackground(1);
  };
  const AddBackground2 = () => {
    setBackground(2);
  };

  const handleAddToCart = (id) => {
    setTotalItemCart(id);
    let arr = [];
    let check = false;

    if (localStorage.getItem("cart") && localStorage.getItem("cart") != null) {
      arr = JSON.parse(localStorage.getItem("cart"));
    } else {
      arr = [];
    }
    arr.map((item) => {
      if (item[0] == id) {
        item[1]++;

        check = true;
      }
      return true;
    });

    if (check === false) {
      arr.push([Number(id), 1]);
    }
    localStorage.setItem("cart", JSON.stringify(arr));
    Toast.fire({
      icon: "success",
      title: "Đã thêm thành công",
    });
  };

  return (
    <div className="detail">
      {products && products.length && (
        <div className="">
          <Navbar settotal={totalItemCart}></Navbar>
          <h3 style={{ margin: "50px auto", textAlign: "center" }}>
            Chi Tiết Sản Phẩm
          </h3>
          <div className="container ">
            <div className="row">
              <div className="col-md-6 me-5 ">
                {thumbsSwiper && (
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    spaceBetween={10}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    className="mySwiper2"
                  >
                    {gallery.map((item) => (
                      <SwiperSlide>
                        <img src={item} alt="img" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  className="mySwiper"
                >
                  {gallery.map((item) => (
                    <SwiperSlide>
                      <img src={item} alt="img" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="col-md">
                {products.map((item) => (
                  <div>
                    <div className="name" style={{ fontSize: "2rem" }}>
                      {item.name}
                    </div>
                    <div className="mt-2">
                      <span
                        class="card-text fst-italic fw-bold me-3"
                        style={{ fontSize: "2rem" }}
                      >
                        {Intl.NumberFormat("en-US").format(
                          item.price * (99 / 100)
                        )}
                      </span>
                      <span
                        class="card-text fst-italic fw-bold text-decoration-line-through "
                        style={{ fontSize: "1.5rem" }}
                      >
                        {Intl.NumberFormat("en-US").format(item.price)}
                      </span>
                    </div>

                    <p className="mt-3 mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco,Proin lectus ipsum, gravida et mattis vulputate,
                      tristique ut lectus
                    </p>
                    <div className="quantity">
                      <span className="">-</span>
                      <button
                        onClick={() => handleAddToCart(id)}
                        type="button"
                        class="btn "
                      >
                        Add to cart
                      </button>
                      <span>+</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="information pb-5">
              <div className="d-flex">
                <div className="me-3">
                  {background === 1 ? (
                    <Link to={`/chitiet/${id}/description`}>
                      <button
                        type="button"
                        class="btn bg-orange"
                        onClick={() => AddBackground1()}
                      >
                        DESCRIPTION
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/chitiet/${id}/description`}>
                      <button
                        type="button"
                        class="btn bg-secondary-subtle"
                        onClick={() => AddBackground1()}
                      >
                        DESCRIPTION
                      </button>
                    </Link>
                  )}
                </div>
                <div className="">
                  {background === 2 ? (
                    <Link to={`/chitiet/${id}/sanphamcungloai`}>
                      <button
                        type="button"
                        class="btn bg-orange"
                        onClick={() => AddBackground2()}
                      >
                        SẢN PHẨM CÙNG LOẠI
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/chitiet/${id}/sanphamcungloai`}>
                      <button
                        type="button"
                        class="btn bg-secondary-subtle"
                        onClick={() => AddBackground2()}
                      >
                        SẢN PHẨM CÙNG LOẠI
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path={`/description`} element={<Description />}></Route>
        <Route path={`/sanphamcungloai`} element={<SampleProducts />}></Route>
      </Routes>
    </div>
  );
}

export default Productsdetail;
