import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars4Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";

import { changeView } from "../redux/view-template";
import { changeFilterType, changeSorting } from "../redux/filters";

const Filters = () => {
  const view = useSelector((state) => state.viewType);
  const filter = useSelector((state) => state.filterOption);

  const dispatch = useDispatch();

  const changeFilterOption = (option) => {
    dispatch(changeFilterType(option));
  };

  const changeSortingOrder = (option) => {
    dispatch(changeSorting(option));
  };

  const changeTemplateView = (template) => {
    dispatch(changeView(template));
  };

  return (
    <section>
      <div className="flex items-center justify-end gap-4 border-b pb-2">
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm leading-4 font-semibold text-gray-900 border border-gray-400 hover:bg-gray-200">
            Sort By
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.sort_type === "default"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeSortingOrder("default")}
                >
                  Default
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.sort_type === "due"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeSortingOrder("due")}
                >
                  Due Date
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm leading-4 font-semibold text-gray-900 border border-gray-400 hover:bg-gray-200">
            Filter
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.filter_type === "all"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeFilterOption("all")}
                >
                  All
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.filter_type === "todo"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeFilterOption("todo")}
                >
                  To Do
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.filter_type === "inprogress"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeFilterOption("inprogress")}
                >
                  In Progress
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    filter.filter_type === "done"
                      ? "bg-gray-100 text-gray-900 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => changeFilterOption("done")}
                >
                  Done
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <div className="rounded bg-white border border-gray-400 divide-x divide-gray-400 overflow-hidden">
          <button
            className={`p-2 ${
              view.view_type === "grid" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => changeTemplateView("grid")}
          >
            <Squares2X2Icon className="size-4" />
          </button>
          <button
            className={`p-2 ${
              view.view_type === "list" ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => changeTemplateView("list")}
          >
            <Bars4Icon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filters;
