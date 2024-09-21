import { configureStore } from "@reduxjs/toolkit";
import filterOption from "./filters";
import viewTemplate from "./view-template";
import tasksList from "./tasks";

export default configureStore({
  reducer: {
    // here multiple reducers can be added for different slice/state
    viewType: viewTemplate,
    filterOption: filterOption,
    tasksList: tasksList,
  },
});
