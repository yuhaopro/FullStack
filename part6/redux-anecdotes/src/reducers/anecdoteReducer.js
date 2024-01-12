import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return state.concat(action.payload);
    },
    likeAnecdote(state, action) {
      return state.map((item) =>
        item.id === action.payload ? { ...item, votes: item.votes + 1 } : item
      );
    },
    sortAnecdote(state, action) {
      return [...state].sort((a, b) => b.votes - a.votes);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

// const reducer = (state = initialState, action) => {
//   // console.log("state now: ", state);
//   // console.log("action", action);
//   switch (action.type) {
//     case "NEW":
//       return state.concat(action.payload);
//     case "LIKE":
//       return state.map((item) =>
//         item.id === action.payload.id
//           ? { ...item, votes: item.votes + 1 }
//           : item
//       );
//     case "SORT":
//       const sortedArray = [...state].sort((a, b) => b.votes - a.votes);
//       return sortedArray;
//     default:
//       break;
//   }

//   return state;
// };

// export const createAnecdote = (anecdote) => {
//   return {
//     type: "NEW",
//     payload: asObject(anecdote),
//   };
// };

// export const sortAnecdote = () => {
//   return {
//     type: "SORT",
//   };
// };

// export const likeAnecdote = (id) => {
//   return {
//     type: "LIKE",
//     payload: { id },
//   };
// };

export const { createAnecdote, sortAnecdote, likeAnecdote, setAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
