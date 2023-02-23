import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { ChangePage } from "../pages/bookSlice";
const PaginationBar = ({ pageNum, setPageNum }) => {
  const dispatch = useDispatch();
  const handleChange = (event, value) => {
    dispatch(ChangePage(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        page={pageNum}
        onChange={(e, v) => handleChange(e, v)}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
