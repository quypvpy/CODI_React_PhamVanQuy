import React, { useState } from "react";
import "../css/login.css";
import Swal from "sweetalert2";
import TextWelcome from "../components/TextWelcome";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [modeLogin, setModeLogin] = useState(false);
  const navigate = useNavigate();
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

  var data = new URLSearchParams();
  data.append("email", email);

  const checkLogin = async (e) => {
    e.preventDefault();
    // Promise
    const response = await fetch(
      "https://students.trungthanhweb.com/api/checkLoginhtml",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      }
    );
    const result = await response.json();

    if (result.check) {
      localStorage.setItem("token", result.apitoken);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      }).then(() => {
        navigate("/products");
      });
    } else {
      setModeLogin(true);
    }
  };
  return (
    <div className="wrapper">
      <div className="container1 p-2">
        <div className="row mt-5 maincontainer">
          <div className="col-md-7 mb-3">
            <div className="left">
              <TextWelcome></TextWelcome>
              <p>
                It’s everywhere you want to be, quality never goes of style.
              </p>
              <button>Explore</button>
            </div>
          </div>
          <div className="col-md right">
            <div className="mt-3">LOGIN</div>
            <div className="row">
              <div className="mb-3 mt-3">
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                {modeLogin && (
                  <div className="custom-invalid-feedback">
                    Email của bạn không đúng.
                  </div>
                )}
                <button
                  onClick={checkLogin}
                  className="inputlogin mt-4"
                  type="button"
                  id="button-addon2"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
