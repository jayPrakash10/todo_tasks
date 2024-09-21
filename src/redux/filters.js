import { createSlice } from "@reduxjs/toolkit";
export const filterOption = createSlice({
  name: "Filter",
  initialState: {
    filter_type: "all",
    sort_type: "default",
  },
  reducers: {
    // methods to update the state
    changeFilterType: (state, action) => {
      state.filter_type = action.payload;
    },

    changeSorting: (state, action) => {
      state.sort_type = action.payload;
    },
  },
});

export const { changeFilterType, changeSorting } = filterOption.actions;
export default filterOption.reducer;
