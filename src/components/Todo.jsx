import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

function Todo() {
  const [todo, setTodo] = useState([]);
  const [item, setItem] = useState("");
  const [id, setId] = useState("");

  const [mode, setMode] = useState("");

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

  const getTodo = () => {
    fetch(
      "https://students.trungthanhweb.com/api/todo?apitoken=" +
        localStorage.getItem("token")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.check === true) {
          setTodo(res.todo);
        }
      });
  };
  // console.log(todo);

  useEffect(() => {
    getTodo();
  }, []);

  const submitTodo = async (e) => {
    e.preventDefault();

    if (!item || item === "") {
      Toast.fire({
        icon: "error",
        title: "Chưa nhập todo",
      });
    } else {
      var data = new URLSearchParams();
      data.append("apitoken", localStorage.getItem("token"));
      data.append("todo", item);

      // Promise
      const response = await fetch(
        "https://students.trungthanhweb.com/api/todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        }
      );
      const res = await response.json();
      if (res.check === true) {
        Toast.fire({
          icon: "success",
          title: "Đã thêm thành công...",
        }).then(() => {
          // window.location.replace("/home");
          getTodo();
        });
      }
    }
  };

  const submitEditTodo = async (e) => {
    e.preventDefault();
    var data = new URLSearchParams();
    data.append("apitoken", localStorage.getItem("token"));
    data.append("todo", item);
    data.append("id", id);

    const response = await fetch(
      "https://students.trungthanhweb.com/api/updatetodo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      }
    );

    const res = await response.json();
    if (res.check === true) {
      Toast.fire({
        icon: "success",
        title: "Đã sửa thành công",
      }).then(() => {
        setItem("");
        getTodo();
        setId(0);
        setMode("");
      });
    }
  };

  const FinishTodo = (id) => {
    Swal.fire({
      icon: "question",
      text: "Hoàn thành Task?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = new URLSearchParams();
        data.append("apitoken", localStorage.getItem("token"));
        data.append("id", id);

        fetch("https://students.trungthanhweb.com/api/statusTodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.check === true) {
              Toast.fire({
                icon: "success",
                title: "Đã hoàn thành Task!",
              }).then(() => {
                setItem("");
                getTodo();
              });
            }
          });
      } else if (result.isDenied) {
        window.location.reload();
        // getTodo();
      }
    });
  };
  const deleteTodo = (id) => {
    Swal.fire({
      icon: "question",
      text: "Xóa Task?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        var data = new URLSearchParams();
        data.append("apitoken", localStorage.getItem("token"));
        data.append("id", id);

        fetch("https://students.trungthanhweb.com/api/deletetodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.check === true) {
              Toast.fire({
                icon: "success",
                title: "Đã xóa thành công!",
              }).then(() => {
                setItem("");
                getTodo();
              });
            }
          });
      }
      // else if(result.isDenied){
      //   window.location.reload()
      // }
    });
  };

  // const deleteTodo = () => {};

  const editTodo = (id, old) => {
    setMode("edit");
    setId(id);
    setItem(old);
  };

  return (
    <div className="">
      <Navbar></Navbar>
      <div>Todo</div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-9">
            <input
              onChange={(e) => setItem(e.target.value)}
              value={item}
              type="text"
              className="form-control"
              placeholder="Todo"
            ></input>
          </div>
          <div className="col-md">
            {mode === "edit" ? (
              <button
                onClick={submitEditTodo}
                className="btn btn-primary w-100"
              >
                Sửa
              </button>
            ) : (
              <button onClick={submitTodo} className="btn btn-primary w-100">
                Thêm
              </button>
            )}
          </div>
        </div>

        <div className="row mt-3">
          {todo && todo.length > 0 && (
            <div class="table-responsive">
              <table class="table table-primary">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Note</th>
                    <th scope="col">Checked</th>
                    <th scope="col">Xóa</th>
                    {/* <th scope="col">Thời gian tạo</th> */}
                  </tr>
                </thead>
                <tbody>
                  {todo.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{++index}</th>
                      <td>
                        {item.status == 1 ? (
                          <b style={{ textDecorationLine: "line-through" }}>
                            {item.note}
                          </b>
                        ) : (
                          <b>{item.note}</b>
                        )}
                      </td>
                      <td>
                        {item.status == 1 ? (
                          <input type="checkbox" defaultChecked disabled />
                        ) : (
                          <input
                            type="checkbox"
                            onChange={() => FinishTodo(item.id)}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTodo(item.id)}
                        >
                          Xóa
                        </button>
                        {item.status == 1 ? (
                          <button className="btn btn-primary ms-4" disabled>
                            Sửa
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary ms-4"
                            onClick={() => editTodo(item.id, item.note)}
                          >
                            Sửa
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
