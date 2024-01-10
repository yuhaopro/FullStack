import React from "react";
import { useDispatch } from "react-redux";
import filterReducer, { filterChange } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
    const dispatch = useDispatch();
  return (
    <div>
      filter
      <input name="filter" placeholder="Enter Filter Text" onChange={(event) => {dispatch(filterChange(event.target.value))}} />
    </div>
  );
};

export default AnecdoteFilter;