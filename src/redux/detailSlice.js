import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
// First, create the thunk
export const GetData = createAsyncThunk(
  "details/getdetails",
  async (payload) => {
    const data = await fetch(
      `https://students.trungthanhweb.com/api/single?apitoken=${token}&id=${payload}`
    ).then((res) => res.json());

    return data;
  }
);
// export const GetData = createAsyncThunk("details/getdetails", (payload) => {
//   const data = fetch(
//     `https://students.trungthanhweb.com/api/single?apitoken=${token}&id=${payload}`
//   ).then((res) => res.json());

//   return data;
// });

const initialState = {
  details: [],
};
const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},

  extraReducers: {
    [GetData.pending]: (state, action) => {
      state.loading = true;
    },
    [GetData.fulfilled]: (state, action) => {
      state.loading = false;
      state.details = action.payload;
      console.log("test", state.details);
    },
    [GetData.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export const { getDetail } = detailSlice.actions;

export default detailSlice.reducer;
