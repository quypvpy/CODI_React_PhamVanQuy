import React from "react";
import Swal from "sweetalert2";
function Product(props) {
  const { result } = props;
  const { classGrid } = props;
  const { handleClick } = props;

  // const image = `https://students.trungthanhweb.com/images/`;
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

  const handleAddToCart = (id) => {
    if (handleClick) {
      handleClick(id);
    }
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
    <>
      {result &&
        result.length > 0 &&
        result.map((item, index) => (
          <div className={classGrid} key={index}>
            {/* Taij một số api trả về image có s.. cái k có s */}
            <div className="card">
              {props.image ? (
                <img
                  src={`https://students.trungthanhweb.com/images/${item.image}`}
                  alt="cart_image"
                  className="card-img-top"
                />
              ) : (
                <img
                  src={`https://students.trungthanhweb.com/images/${item.images}`}
                  alt="cart_image"
                  className="card-img-top"
                />
              )}

              <div className="card-body">
                <h4 className="card-title fs-5">{item.name}</h4>
                <p
                  className="card-text fst-italic fw-bold"
                  style={{ fontSize: "13px" }}
                >
                  {Intl.NumberFormat("en-US").format(item.price)}
                </p>
                <p
                  className="card-text fst-italic"
                  style={{ fontSize: "13px" }}
                >
                  Loại Sản Phẩm:{" "}
                  <span className="fw-normal" style={{ fontSize: "16px" }}>
                    {item.catename}
                  </span>
                </p>
                <p
                  className="card-text fst-italic"
                  style={{ fontSize: "13px" }}
                >
                  Thương Hiệu:{" "}
                  <span className="fw-normal" style={{ fontSize: "16px" }}>
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
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Product;
