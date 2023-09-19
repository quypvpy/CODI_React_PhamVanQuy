import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Bills() {
  const [bills, setBills] = useState([]);
  const [billDetail, setBillDetail] = useState([]);
  const [totalBill, setTotalBill] = useState();
  const token = localStorage.getItem("token");
  const [billActive, setBillActive] = useState();
  const [limit, setLimit] = useState(5);

  const image = `https://students.trungthanhweb.com/images/`;

  const getValue = async () => {
    fetch(`https://students.trungthanhweb.com/api/bills?apitoken=${token}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log("result", result.bills.slice(0, 5));
        if (result.bills.length > 0) {
          setTotalBill(result.bills.length);
          setBills(result.bills.slice(0, limit));
          //   setLastpage(result.products.last_page);
        }
      });
  };
  const getValueBillDetail = async () => {
    if (billActive) {
      fetch(
        `https://students.trungthanhweb.com/api/singlebill?apitoken=${token}&id=${billActive}`
      )
        .then((res) => res.json())
        .then((result) => {
          // console.log("result", result.bills.slice(0, 5));
          if (result.result.length > 0) {
            setBillDetail(result.result);
          }
        });
    }
  };
  useEffect(() => {
    getValue();
  }, [limit]);
  useEffect(() => {
    getValueBillDetail();
  }, [billActive]);

  return (
    <div className="bills">
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ol className="list-group list-group-numbered">
              {bills &&
                bills.map((item, index) =>
                  billActive === item.id ? (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-start active"
                      onClick={() => setBillActive(item.id)}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.tenKH}</div>
                        {item.phone}
                      </div>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-start"
                      onClick={() => setBillActive(item.id)}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.tenKH}</div>
                        {item.phone}
                      </div>
                    </li>
                  )
                )}
            </ol>
            {limit < totalBill && (
              <button
                onClick={() => setLimit(limit + 5)}
                type="button"
                className="btn btn-success mt-4 mb-5"
                style={{ display: "block", margin: "0 auto" }}
              >
                Xem thêm
              </button>
            )}
          </div>
          <div className="col-md ">
            {billDetail && billDetail.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {billDetail.map((item, index) => (
                    <tr key={index} className="align-middle">
                      <th scope="row">{++index}</th>
                      <td>
                        <img
                          style={{ width: "120px" }}
                          src={`${image}${item.image}`}
                          alt="img"
                        />
                      </td>
                      <td>{item.productname}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>{item.price * item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bills;
