import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../css/styles.css";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";

function SampleProducts() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [brandProduct, setBrandproducts] = useState();
  const [cateProduct, setCateproducts] = useState();

  const token = localStorage.getItem("token");

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
  const getValue = async () => {
    return fetch(
      `https://students.trungthanhweb.com/api/single?apitoken=${token}&id=${id}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setData(result);
          setBrandproducts(result.brandproducts);
          setCateproducts(result.cateproducts);
        }
      });
  };
  console.log("data", data);
  useEffect(() => {
    getValue();
  }, []);
  const handleAddToCart = (id) => {
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
    <div>
      {cateProduct && (
        <div className="container sampleProduct">
          <h4 className="">Sản phẩm cùng loại</h4>
          <>
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              freeMode={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {cateProduct.map((item) => (
                <SwiperSlide>
                  <div class="card" key={item.id}>
                    <img
                      src={`https://students.trungthanhweb.com/images/${item.image}`}
                      alt="cart_image"
                      className="card-img-top"
                    />

                    <div class="card-body">
                      <h4 class="card-title fs-5">{item.name}</h4>
                      <p
                        class="card-text fst-italic fw-bold"
                        style={{ fontSize: "13px" }}
                      >
                        {Intl.NumberFormat("en-US").format(item.price)}
                      </p>
                      <p
                        class="card-text fst-italic"
                        style={{ fontSize: "13px" }}
                      >
                        Loại Sản Phẩm:{" "}
                        <span
                          className="fw-normal"
                          style={{ fontSize: "16px" }}
                        >
                          {item.catename}
                        </span>
                      </p>
                      <p
                        class="card-text fst-italic"
                        style={{ fontSize: "13px" }}
                      >
                        Thương Hiệu:{" "}
                        <span
                          className="fw-normal"
                          style={{ fontSize: "16px" }}
                        >
                          {item.brandname}
                        </span>
                      </p>
                      <a
                        href={`/chitiet/${item.id}`}
                        className="btn bg-success me-2 text-white"
                      >
                        Chi Tiết
                      </a>
                      <button
                        class="btn btn-primary"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>

          <h4 className="mt-3">Sản phẩm cùng thương hiệu</h4>
          <>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[FreeMode, Pagination, Navigation]}
              className="mySwiper"
            >
              {brandProduct.map((item) => (
                <SwiperSlide>
                  <div class="card" key={item.id}>
                    <img
                      src={`https://students.trungthanhweb.com/images/${item.image}`}
                      alt="cart_image"
                      className="card-img-top"
                    />

                    <div class="card-body">
                      <h4 class="card-title fs-5">{item.name}</h4>
                      <p
                        class="card-text fst-italic fw-bold"
                        style={{ fontSize: "13px" }}
                      >
                        {Intl.NumberFormat("en-US").format(item.price)}
                      </p>
                      <p
                        class="card-text fst-italic"
                        style={{ fontSize: "13px" }}
                      >
                        Loại Sản Phẩm:{" "}
                        <span
                          className="fw-normal"
                          style={{ fontSize: "16px" }}
                        >
                          {item.catename}
                        </span>
                      </p>
                      <p
                        class="card-text fst-italic"
                        style={{ fontSize: "13px" }}
                      >
                        Thương Hiệu:{" "}
                        <span
                          className="fw-normal"
                          style={{ fontSize: "16px" }}
                        >
                          {item.brandname}
                        </span>
                      </p>
                      <a
                        href={`/chitiet/${item.id}`}
                        className="btn bg-success me-2 text-white"
                      >
                        Chi Tiết
                      </a>
                      <button
                        class="btn btn-primary"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        </div>
      )}
    </div>
  );
}

export default SampleProducts;
