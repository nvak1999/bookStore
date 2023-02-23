import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  bookStore: [],
  book: null,
  loading: false,
  errorMessage: "",
  page: 1,
  query: "",
  totalPage: 10,
};

export const getBook = createAsyncThunk(
  "bookStore/getBook",
  async ({ page, query }) => {
    let url = `/books?_page=${page}&_limit=10`;
    if (query) url += `&q=${query}`;
    const response = await apiService.get(url);
    console.log(response.data);
    return response.data;
  }
);
export const getReadingBook = createAsyncThunk(
  "bookStore/getReadingBook",
  async () => {
    let url = `/favorites`;
    const response = await apiService.get(url);
    return response.data;
  }
);
export const removeReadingBook = createAsyncThunk(
  "bookStore/removeReadingBook",
  async (removedBookId) => {
    let url = `/favorites/${removedBookId}`;
    await apiService.delete(url);
    return removedBookId;
  }
);
export const getBookDetail = createAsyncThunk(
  "bookStore/getBookDetail",
  async (bookId) => {
    let url = `/books/${bookId}`;
    const response = await apiService.get(url);
    console.log(response.data);
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
    seLoading: (state, action) => {
      state.loading = action.payload;
    },
    // setRemovedBookId: (state, action) => {
    //   console.log(action.payload);
    //   state.removeBookId = action.payload;
    // },
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
    builder.addCase(getReadingBook.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReadingBook.fulfilled, (state, action) => {
      state.loading = false;
      state.bookStore = action.payload;
    });
    builder.addCase(getReadingBook.rejected, (state, action) => {
      state.loading = true;
      state.errorMessage = action.error.message;
    });
    builder.addCase(removeReadingBook.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeReadingBook.fulfilled, (state, action) => {
      state.loading = false;
      state.bookStore = state.bookStore.filter(
        (book) => book.id !== action.payload
      );
    });
    builder.addCase(removeReadingBook.rejected, (state, action) => {
      state.loading = true;
      state.errorMessage = action.error.message;
    });
    builder.addCase(getBookDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBookDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload;
    });
    builder.addCase(getBookDetail.rejected, (state, action) => {
      state.loading = true;
      state.errorMessage = action.error.message;
    });
  },
});
export const { ChangePage, searchQuery, setLoading, setRemovedBookId } =
  bookSlice.actions;
export default bookSlice.reducer;
