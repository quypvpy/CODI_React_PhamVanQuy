import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTaskSlice,
  editTask,
  finishTask,
  getTodo,
  selectTask,
} from "../redux/todoSlice";
// import Navbar from "./Navbar";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

function Todo2() {
  const dispath = useDispatch();
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

  useEffect(() => {
    dispath(getTodo());
  }, []);

  //   vaof store coi tên j nó lấy
  const { todos, loading } = useSelector((state) => state.task);

  const submitTodo = async (e) => {
    e.preventDefault();

    if (!item || item === "") {
      Toast.fire({
        icon: "error",
        title: "Chưa nhập todo",
      });
    } else {
      var item1 = Object();
      item1.id = Date.now();
      item1.note = item;
      item1.status = false;
      dispath(addTask(item1));
      setItem("");

      Toast.fire({
        icon: "success",
        title: "Đã thêm thành công...",
      });
    }
  };

  const submitEditTodo = async (e) => {
    e.preventDefault();
    var data = Object();
    data.todo = item;
    data.id = id;
    dispath(editTask(data));
    setMode("");
    setItem("");

    Toast.fire({
      icon: "success",
      title: "Đã sửa thành công",
    });
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
        dispath(finishTask(id));
        Toast.fire({
          icon: "success",
          title: "Đã hoàn thành Task!",
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
        dispath(deleteTaskSlice(id));
      }
    });
  };

  const editTodo = (id, old) => {
    setMode("edit");
    setId(id);
    setItem(old);
  };

  return (
    <div className="mt-5">
      <Navbar></Navbar>

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
          {todos && todos.length > 0 && (
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
                  {todos.map((item, index) => (
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

    // <div className="row mt-5">
    //   <div className="col-md">
    //     <input
    //       type="text"
    //       className="form-control"
    //       onChange={(e) => setItem(e.target.value)}
    //     />
    //   </div>
    //   <div className="col-md">
    //     <button className="btn btn-primary" onClick={submitTodo}>
    //       Thêm
    //     </button>
    //   </div>
    // </div>
  );
}

export default Todo2;
