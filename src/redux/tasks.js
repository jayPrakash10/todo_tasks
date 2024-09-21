import { createSlice } from "@reduxjs/toolkit";

export const tasksList = createSlice({
  name: "Tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    // methods to update the state
    addTask: (state, action) => {
      const temp = [...state.tasks];
      temp.unshift(action.payload);
      state.tasks = temp;
    },

    editTask: (state, action) => {
      let temp = [...state.tasks];
      temp = temp.map((task) =>
        task.id !== action.payload.id ? task : action.payload.data
      );
      state.tasks = temp;
    },

    deleteTask: (state, action) => {
      let temp = [...state.tasks];
      temp = temp.filter((task) => task.id !== action.payload);
      state.tasks = temp;
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksList.actions;
export default tasksList.reducer;
