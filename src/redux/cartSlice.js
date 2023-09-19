import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCart = createAsyncThunk("carts/getCart", async () => {
  var id = JSON.parse(localStorage.getItem("cart"));

  var token = "";
  if (localStorage.getItem("token") && localStorage.getItem("cart") != null) {
    token = localStorage.getItem("token");
  }
  var data = new URLSearchParams();
  data.append("apitoken", localStorage.getItem("token"));
  data.append("id", JSON.stringify(id));

  return fetch("https://students.trungthanhweb.com/api/getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  }).then((res) => res.json());
});

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    loading: false,
    fetchCreateBill: false,
  },
  reducers: {
    deleteItem: (state, action) => {
      state.carts = state.carts.filter((item) => item[0] !== action.payload);
      var arr = [];
      state.carts.map((item) => arr.push([Number(item[0]), Number(item[4])]));

      localStorage.setItem("cart", JSON.stringify(arr));
    },
    AddTocart: (state, action) => {
      const index = state.carts.findIndex((x) => x[0] == action.payload);
      state.carts[index][4] += 1;

      // lưu vào localstore
      var arr = [];

      state.carts.map((item) => arr.push([Number(item[0]), Number(item[4])]));

      localStorage.setItem("cart", JSON.stringify(arr));
    },
    Removecart: (state, action) => {
      const index = state.carts.findIndex((x) => x[0] == action.payload);

      if (state.carts[index][4] == 1) return;
      state.carts[index][4] -= 1;

      // lưu vào localstore
      var arr = [];
      state.carts.map((item) => arr.push([Number(item[0]), Number(item[4])]));

      localStorage.setItem("cart", JSON.stringify(arr));
    },
    SubmitCart: (state, action) => {
      let token = localStorage.getItem("token");
      let data = new URLSearchParams();
      data.append("apitoken", token);
      data.append("tenKH", action.payload.name);
      data.append("phone", action.payload.phone);
      data.append("address", action.payload.address);
      data.append("cart", localStorage.getItem("cart"));

      fetch("https://students.trungthanhweb.com/api/createBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          localStorage.removeItem("cart");
        });

      state.fetchCreateBill = true;
    },
  },
  extraReducers: {
    [getCart.pending]: (state, action) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.loading = false;

      // console.log("redu", action.payload);

      state.carts = action.payload.result;

      // console.log("object", state);
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { deleteItem, AddTocart, Removecart, SubmitCart } =
  cartSlice.actions;

export default cartSlice.reducer;
