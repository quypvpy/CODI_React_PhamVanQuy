import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Navbar(props) {
  const [categrories, setCategrories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [limit, setLimit] = useState(4);
  const [valueSearch, setValueSearch] = useState();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const cart = localStorage.getItem("cart");

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

  let sum = 0;
  if (cart) {
    JSON.parse(cart).map((item) => (sum += item[1]));
  }

  const getValue = async () => {
    fetch(
      `https://students.trungthanhweb.com/api/home1?apitoken=${token}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.products.length > 0) {
          setCategrories(result.categrories);
          setBrands(result.brands);
        }
      });
  };

  // vì chỉ để lấy dữ liệu mẫu lúc đầu render lên nabar .. nên setLimit k cần
  useEffect(() => {
    getValue();
  }, [limit]);

  const handlebtnSearch = (e) => {
    e.preventDefault();
    if (valueSearch) {
      if (valueSearch.trim()) {
        navigate(`/products?name=${valueSearch.trim()}&limit=4`);
      }
    }
  };

  const ClickCart = () => {
    navigate("/cart");
  };
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "question",
      text: "Bạn muốn đăng xuất ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (result.isDenied) {
      }
    });
  };
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/products">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="index.html"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Loại Sản Phẩm
                </a>
                <ul className="dropdown-menu">
                  {categrories.map((item) => (
                    <li key={item.id}>
                      <a
                        className="dropdown-item"
                        href={`/categories?id=${item.id}&page=1`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="index.html"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thương Hiệu
                </a>
                <ul className="dropdown-menu">
                  {brands.map((item) => (
                    <li key={item.id}>
                      <a
                        className="dropdown-item"
                        href={`/brands?id=${item.id}&page=1`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/bills`}>
                  Hóa Đơn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/todo2`}>
                  Todo
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => handleLogout(e)}
                >
                  Logout
                </a>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <div
                className="icon-cart position-relative me-4"
                onClick={() => ClickCart()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-cart-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {sum}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </div>
              <input
                onChange={(e) => setValueSearch(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                onClick={(e) => handlebtnSearch(e)}
                type="text"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
