import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

import queryString from "query-string";
import SearchCate from "../components/SearchCate";

function Categories() {
  const [products, setProducts] = useState([]);
  const [lastPage, setLastpage] = useState(0);
  const [totalItemCart, setTotalItemCart] = useState();

  const [price1, setPrice1] = useState();
  const [price2, setPrice2] = useState();
  const [mode, setMode] = useState(false);

  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  let params = queryString.parse(location.search);

  const [pageActive, setPageActive] = useState(
    Number.parseInt(params.page) || 1
  );
  const [queryParams, setQueryParams] = React.useState(() => ({
    ...params,
    page: Number.parseInt(params.page) || 1,
    id: Number.parseInt(params.id),
  }));

  const handleClickPage = (page, event) => {
    // phải  có này để nó k chạy đi qua trang kia
    event.preventDefault();
    if (page === "btnPrev") {
      page = pageActive - 1;
    } else if (page === "btnNext") {
      page = pageActive + 1;
    }
    setPageActive(page);
    const filters = {
      ...queryParams,
      page: page,
    };
    navigate(`?${queryString.stringify(filters)}`);

    setQueryParams({
      ...params,
      page: page,
    });
  };

  const getValue = async () => {
    if (!mode) {
      fetch(
        `https://students.trungthanhweb.com/api/getCateProducts?apitoken=${token}&${queryString.stringify(
          queryParams
        )}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.products.data.length > 0) {
            setProducts(result.products.data);
            setLastpage(result.products.last_page);
          }
        });
    }
  };

  useEffect(() => {
    getValue();
  }, [queryParams]);

  // tạo một mảng gồm có lastpage..(Độ dài length =lastpage)
  const numberPage = Array(lastPage).fill(lastPage);

  const handleBtnSearch = (e) => {
    e.preventDefault();
    if (price1 >= 0 && price2 >= 0 && price1.trim() && price2.trim()) {
      let newFitler = {
        price1,
        price2,
      };
      navigate(
        `search?&id=${queryParams.id}&${queryString.stringify(newFitler)}`
      );
      setMode(true);
    } else if (price1 >= 0 && price1.trim()) {
      let newFitler = {
        price1,
      };
      navigate(
        `search?&id=${queryParams.id}&${queryString.stringify(newFitler)}`
      );
      setMode(true);
    } else if (price2 >= 0 && price2.trim()) {
      let newFitler = {
        price2,
      };
      navigate(
        `search?&id=${queryParams.id}&${queryString.stringify(newFitler)}`
      );
      setMode(true);
    } else {
      return;
    }
  };
  const handleClick = (id) => {
    setTotalItemCart(id);
  };

  return (
    <div className="categories">
      <Navbar settotal={totalItemCart}></Navbar>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 ">
            <div className="input-group mb-3 mt-5">
              <input
                onChange={(e) => setPrice1(e.target.value)}
                className="me-3 form-control"
                type="text"
                placeholder="Giá từ"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <input
                onChange={(e) => setPrice2(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Giá đến  "
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="">
              <button
                type="button"
                onClick={(e) => handleBtnSearch(e)}
                className="form-control btn btn-info"
              >
                Tìm Kiếm
              </button>
            </div>
          </div>

          {location.pathname === "/categories/search" ? (
            <SearchCate></SearchCate>
          ) : (
            <div className="col-md ">
              <div className="row">
                <Product
                  handleClick={handleClick}
                  result={products}
                  classGrid="col-sm-6 col-md-4"
                  image={true}
                ></Product>
              </div>

              <nav aria-label="Page navigation  example">
                <ul className="pagination justify-content-center mt-4 pb-3">
                  {pageActive === 1 ? (
                    <li className="page-item disabled">
                      <button
                        className="page-link"
                        onClick={(e) => handleClickPage("btnPrev", e)}
                      >
                        &laquo;
                      </button>
                    </li>
                  ) : (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={(e) => handleClickPage("btnPrev", e)}
                      >
                        &laquo;
                      </button>
                    </li>
                  )}

                  {numberPage.map((item, index) =>
                    pageActive === index + 1 ? (
                      <li key={index} className="page-item active">
                        <button
                          className="page-link"
                          onClick={(e) => handleClickPage(index + 1, e)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ) : (
                      <li key={index} className="page-item">
                        <button
                          className="page-link"
                          onClick={(e) => handleClickPage(index + 1, e)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}

                  {lastPage === pageActive ? (
                    <li className="page-item disabled">
                      <button
                        className="page-link"
                        onClick={(e) => handleClickPage("btnNext", e)}
                      >
                        &raquo;
                      </button>
                    </li>
                  ) : (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={(e) => handleClickPage("btnNext", e)}
                      >
                        &raquo;
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
