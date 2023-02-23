import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail } from "./bookSlice";
import apiService from "../app/apiService";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const BookDetailPage = () => {
  const dispatch = useDispatch();
  const { loading, book } = useSelector((state) => state.book);
  const [addingBook, setAddingBook] = useState(false);
  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    console.log("get book detail");
    dispatch(getBookDetail(bookId));
  }, [dispatch, bookId]);

  const addToReadingList = (book) => {
    setAddingBook(book);
  };

  useEffect(() => {
    console.log(addingBook);
    const postData = async () => {
      try {
        if (!addingBook) return;
        await apiService.post(`/favorites`, addingBook);
        toast.success("The book has been added to the reading list!");
      } catch (error) {
        toast.error(error.message);
      }
    };
    postData();
    console.log("post book detail2");
  }, [addingBook]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(book)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
