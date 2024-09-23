import React from "react";
import { useSelector } from "react-redux";

const TasksList = ({ children }) => {
  const view = useSelector((state) => state.viewType);

  return (
    <div
      className={`${
        view.view_type === "list" ? "flex flex-col" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      } gap-2`}
    >
      {children}
    </div>
  );
};

export default TasksList;
