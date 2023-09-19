import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";

import {
  AddTocart,
  Removecart,
  SubmitCart,
  deleteItem,
  getCart,
} from "../redux/cartSlice";
import Swal from "sweetalert2";
function Cart() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState(false);
  const [isValidate, setIsvalidate] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);

  const [total, setTotal] = useState(0);

  const fetchBill = useSelector((state) => state.cart.fetchCreateBill);

  const dispatch = useDispatch();
  const cartStored = JSON.parse(localStorage.getItem("cart"));

  const { carts } = useSelector((state) => state.cart);

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
    dispatch(getCart());
  }, []);

  const deleteCart = (id) => {
    Swal.fire({
      icon: "question",
      text: "Bạn muốn xóa sản phẩm ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteItem(id));
      } else if (result.isDenied) {
      }
    });
  };
  const getTotal = async () => {
    let arrid = JSON.parse(localStorage.getItem("cart"));
    let token = localStorage.getItem("token");
    var data = new URLSearchParams();
    data.append("apitoken", token);
    data.append("id", JSON.stringify(arrid));

    if (localStorage.getItem("token") && localStorage.getItem("cart") != null) {
      data.append("apitoken", token);
      data.append("id", JSON.stringify(arrid));

      fetch("https://students.trungthanhweb.com/api/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          let sumtotal = 0;
          result.result.map((item) => (sumtotal += item[6]));
          setTotal(sumtotal);
        });
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const HandleRemoveClick = (id) => {
    dispatch(Removecart(id));
    getTotal();
  };

  const handleAddClick = (id) => {
    dispatch(AddTocart(id));
    getTotal();
  };
  const handleSubmit = () => {
    setIsvalidate(true);

    if (name.trim() && address.trim() && phone.trim()) {
      const format = /(0[3|5|7|9])+([0-9]{8})\b/g;
      if (!phone.match(format)) {
        setCheckPhone(true);
        return;
      }
      setCheckPhone(false);
      const data = {
        name,
        address,
        phone,
      };
      dispatch(SubmitCart(data));
    }
  };
  const handleCancel = (id) => {
    setIsvalidate(false);
    setMode(false);
  };
  if (fetchBill) {
    Toast.fire({
      icon: "success",
      title: "Thanssh toán thành công",
    }).then(() => window.location.replace("/products"));
  }
  // console.log("check", localStorage.getItem("cart"));

  return (
    <div className="carts">
      <Navbar></Navbar>
      <div className="container-fluid cart">
        {cartStored && cartStored.length ? (
          <div className="row w-100 mt-4">
            <div className="col-md">
              <div className="table-responsive">
                <table className="table ">
                  <thead className="table-success ">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Hình ảnh </th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Thành tiền</th>
                      <th scope="col">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((item, index) => (
                      <tr key={index} className="align-middle">
                        <td scope="row">{++index}</td>
                        <td>
                          <a href={`/chitiet/${item[0]}`}>
                            <img
                              style={{ width: "100px" }}
                              src={item[3]}
                              alt="img"
                            />
                          </a>
                        </td>
                        <td className="text-left align-middle">
                          <a
                            style={{ textDecoration: "none" }}
                            href={`/chitiet/${item[0]}`}
                          >
                            {item[1]}
                          </a>
                        </td>

                        <td className="text-left align-middle">
                          {Intl.NumberFormat("en-US").format(item[5])}
                        </td>
                        <td className="text-left align-middle">
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic mixed styles example"
                          >
                            <button
                              type="button"
                              className="btn bg-success-subtle"
                              onClick={(e) => HandleRemoveClick(item[0])}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="btn bg-success-subtle "
                            >
                              {item[4]}
                            </button>
                            <button
                              type="button"
                              className="btn bg-success-subtle"
                              onClick={() => handleAddClick(item[0])}
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="text-left align-middle">
                          {Intl.NumberFormat("en-US").format(item[4] * item[5])}
                        </td>
                        <td className="text-left align-middle">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteCart(item[0])}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}

                    <tr className="fw-bold">
                      <td colSpan={6}>Tổng cộng</td>
                      <td>{Intl.NumberFormat("en-US").format(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* form */}
            <div className="col-md-3 ms-5 ">
              {mode ? (
                <div className="">
                  {isValidate ? (
                    <form
                      className=" row g-3 needs-validation was-validated"
                      noValidate
                    >
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Tên người nhận
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Tên người nhận"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        {!name.trim() ? (
                          <div className="custom-invalid-feedback">
                            Vui lòng nhập tên của bạn.
                          </div>
                        ) : (
                          <div className="invalid-feedback custom2">
                            Vui lòng nhập tên của bạn.
                          </div>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Địa chỉ
                        </label>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          placeholder=" Địa chỉ"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        {!address.trim() ? (
                          <div className="custom-invalid-feedback">
                            Nhập địa chỉ của bạn.
                          </div>
                        ) : (
                          <div className="invalid-feedback custom2">
                            Nhập địa chỉ của bạn.
                          </div>
                        )}
                      </div>
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Số điện thoại
                        </label>
                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          type="text"
                          placeholder="Số điện thoại"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        {!phone.trim() ? (
                          <div className="custom-invalid-feedback">
                            Số điện thoại không được để trống.
                          </div>
                        ) : (
                          <div className="invalid-feedback custom2">
                            Số điện thoại không được để trống.
                          </div>
                        )}
                        {checkPhone && phone.trim() ? (
                          <div className="custom-invalid-feedback">
                            Số điện thoại không đúng.
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>

                      <div className="">
                        <button
                          type="button"
                          className="btn btn-success me-3 "
                          onClick={() => handleSubmit()}
                        >
                          Thanh Toán
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleCancel()}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form className=" row g-3 needs-validation" noValidate>
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Tên người nhận
                        </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Tên người nhận"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        <div className="invalid-feedback">
                          Vui lòng nhập tên của bạn.
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Địa chỉ
                        </label>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          placeholder=" Địa chỉ"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        <div className="invalid-feedback">
                          Địa chỉ không được để trống.
                        </div>
                      </div>
                      <div className="">
                        <label
                          htmlFor="validationCustom03"
                          className="form-label"
                        >
                          Số điện thoại
                        </label>
                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          type="text"
                          placeholder="Số điện thoại"
                          className="form-control"
                          id="validationCustom03"
                          required
                        />
                        <div className="invalid-feedback">
                          Số điện thoại không được để trống.
                        </div>
                      </div>

                      <div className="">
                        <button
                          type="button"
                          className="btn btn-success me-3 "
                          onClick={() => handleSubmit()}
                        >
                          Thanh Toán
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleCancel()}
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className=" text-center">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setMode(true)}
                  >
                    Thanh toán đơn hàng
                  </button>
                </div>
              )}
            </div>

            {/* end form */}
          </div>
        ) : (
          <h3 className="mt-5">Giỏ hàng trống.</h3>
        )}
      </div>
    </div>
  );
}

export default Cart;
