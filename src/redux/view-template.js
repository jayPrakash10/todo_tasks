import { createSlice } from "@reduxjs/toolkit";
export const viewTemplate = createSlice({
  name: "View Template",
  initialState: {
    view_type: "list",
  },
  reducers: {
    // methods to update the state
    changeView: (state, action) => {
      state.view_type = action.payload;
    },
  },
});

export const { changeView } = viewTemplate.actions;
export default viewTemplate.reducer;
