import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  bookStore: [],
  loading: false,
  errorMessage: "",
  page: 1,
  query: "",
  totalPage: 10,
};

export const getBook = createAsyncThunk(
  "bookStore/getBook",
  async (pageNum, limit, query) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await apiService.get(url);
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    ChangePage: (state, action) => {
      state.page = action.payload;
    },
    searchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.loading = false;
      state.bookStore = action.payload;
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.loading = true;
      state.errorMessage = action.error.message;
    });
  },
});
export const { ChangePage, searchQuery } = bookSlice.actions;
export default bookSlice.reducer;
