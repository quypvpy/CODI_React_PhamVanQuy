import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTodo = createAsyncThunk("todos/getTodos", async () => {
  return fetch(
    "https://students.trungthanhweb.com/api/todo?apitoken=" +
      localStorage.getItem("token")
  ).then((res) => res.json());
  // console.log('slice',);
});

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todos.push(action.payload);

      const data = new URLSearchParams();
      data.append("apitoken", localStorage.getItem("token"));

      data.append("todo", action.payload.note);
      fetch("https://students.trungthanhweb.com/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
    },
    editTask: (state, action) => {
      state.todos.forEach((el) => {
        if (el.id === action.payload.id) {
          el.note = action.payload.todo;
          el.status = false;
          const data = new URLSearchParams();
          data.append("apitoken", localStorage.getItem("token"));
          data.append("todo", action.payload.todo);
          data.append("id", action.payload.id);

          fetch("https://students.trungthanhweb.com/api/updatetodo", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
          });
        }
      });
    },
    finishTask: (state, action) => {
      state.todos.forEach((el) => {
        if (el.id === action.payload) {
          el.status = true;
        }
        const data = new URLSearchParams();
        data.append("apitoken", localStorage.getItem("token"));
        data.append("id", action.payload);

        fetch("https://students.trungthanhweb.com/api/statusTodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        });
      });
    },
    deleteTaskSlice: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      var data = new URLSearchParams();
      data.append("apitoken", localStorage.getItem("token"));
      data.append("id", action.payload);

      fetch("https://students.trungthanhweb.com/api/deletetodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
    },
  },

  extraReducers: {
    [getTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [getTodo.fulfilled]: (state, action) => {
      state.loading = false;

      state.todos = action.payload.todo;
    },
    [getTodo.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { addTask, editTask, deleteTaskSlice, finishTask } =
  todoSlice.actions;
export const selectTask = (state) => state.todos;

export default todoSlice.reducer;
