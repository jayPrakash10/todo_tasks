import React, { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask } from "../redux/tasks";
import Datepicker from "react-tailwindcss-datepicker";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const TaskItem = ({ task, index }) => {
  const view = useSelector((state) => state.viewType);
  const dispatch = useDispatch();

  const dDate = moment(task.dueDate).format("DD/MM/YYYY");

  const [isExpired, setIsExpired] = useState(false);
  const [isDue, setIsDue] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    if (moment(task.dueDate).isBefore(moment())) {
      setIsExpired(true);
      setIsDue(false);
    } else if (moment(task.dueDate).diff(moment(), "days") < 2) {
      setIsDue(true);
      setIsExpired(false);
    }
  }, [task.dueDate]);

  const onSaveEdit = () => {
    dispatch(editTask({ id: task.id, data: editedTask }));
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-4">
      {view.view_type === "list" && (
        <div className="flex items-center justify-between -m-2 gap-2">
          {!isEditing ? (
            <>
              <div className="text-lg font-semibold truncate">{task.title}</div>
              <div className="flex items-center gap-6">
                <div
                  className={`${
                    isExpired ? "" : isDue ? "text-red-600" : "text-green-600"
                  }`}
                >
                  <span>
                    <b>Due : </b>
                  </span>{" "}
                  <span>{dDate}</span>
                </div>
                <span
                  className={`rounded border px-2 py-1 w-28 text-center
                  ${
                    task.status === "To Do"
                      ? "bg-sky-200 border-sky-300"
                      : task.status === "In Progress"
                      ? "bg-amber-200 border-amber-300"
                      : "bg-green-200 border-green-300"
                  }`}
                >
                  {task.status}
                </span>
                <button
                  className="border border-gray-400 rounded p-1"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilSquareIcon className="size-5 text-gray-600" />
                </button>
                <button
                  className="border border-red-300 rounded p-1"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  <TrashIcon className="size-5 text-red-400" />
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                value={task.title}
                className="flex-1 border rounded outline-0 text-lg px-2 py-1 -my-1 -ml-1"
                onChange={(event) =>
                  setEditedTask((prev) => {
                    return { ...prev, title: event.target.value };
                  })
                }
                autoFocus
                required
              />
              <Datepicker
                containerClassName={"relative"}
                inputClassName={
                  "relative transition-all duration-300 py-1.5 pl-2 pr-10 w-40 outline-0 rounded border tracking-wide font-light placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                }
                inputId="dueDate"
                useRange={false}
                asSingle={true}
                displayFormat="DD/MM/YYYY"
                minDate={new Date()}
                value={{
                  startDate: editedTask.dueDate,
                  endDate: editedTask.dueDate,
                }}
                onChange={(value) => {
                  setEditedTask((prev) => {
                    return {
                      ...prev,
                      dueDate: moment(value.endDate).endOf("day").format(),
                    };
                  });
                }}
                required
              />
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex w-32 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm leading-4 font-semibold text-gray-900 border border-gray-400 hover:bg-gray-200">
                  <span className="flex-1">{editedTask.status}</span>
                  <ChevronDownIcon className="size-4 float-right" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "To Do"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "To Do" };
                          })
                        }
                      >
                        To Do
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "In Progress"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "In Progress" };
                          })
                        }
                      >
                        In Progress
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "Done"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "Done" };
                          })
                        }
                      >
                        Done
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <button
                className="border rounded px-2 py-1"
                onClick={() => {
                  setEditedTask(task);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                className="border border-green-500 rounded px-2 py-1 bg-green-400 text-white"
                onClick={() => onSaveEdit()}
              >
                Save
              </button>
            </>
          )}
        </div>
      )}
      {view.view_type === "grid" &&
        (!isEditing ? (
          <>
            <div className="flex items-center justify-between">
              <div className="font-semibold truncate">{task.title}</div>
              <div
                className={`rounded text-center ${
                  task.status === "To Do"
                    ? "text-sky-600"
                    : task.status === "In Progress"
                    ? "text-amber-600"
                    : "text-green-600"
                }`}
              >
                {task.status}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div
                className={`text-sm ${
                  isExpired ? "" : isDue ? "text-red-600" : "text-green-600"
                }`}
              >
                <span>
                  <b>Due : </b>
                </span>{" "}
                <span>{dDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border border-gray-400 rounded p-1"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilSquareIcon className="size-4 text-gray-600" />
                </button>
                <button
                  className="border border-red-300 rounded p-1"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  <TrashIcon className="size-4 text-red-400" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              value={task.title}
              className="flex-1 border rounded outline-0 w-full px-2 py-1"
              onChange={(event) =>
                setEditedTask((prev) => {
                  return { ...prev, title: event.target.value };
                })
              }
              autoFocus
              required
            />
            <div className="text-end">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex w-32 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm leading-4 font-semibold text-gray-900 border border-gray-400 hover:bg-gray-200">
                  <span className="flex-1">{editedTask.status}</span>
                  <ChevronDownIcon className="size-4 float-right" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "To Do"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "To Do" };
                          })
                        }
                      >
                        To Do
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "In Progress"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "In Progress" };
                          })
                        }
                      >
                        In Progress
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          editedTask.status === "Done"
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setEditedTask((prev) => {
                            return { ...prev, status: "Done" };
                          })
                        }
                      >
                        Done
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
            <Datepicker
              containerClassName={"relative"}
              inputClassName={
                "relative transition-all duration-300 py-1.5 pl-2 pr-10 w-full outline-0 rounded border tracking-wide font-light placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              }
              inputId="dueDate"
              useRange={false}
              asSingle={true}
              displayFormat="DD/MM/YYYY"
              minDate={new Date()}
              value={{
                startDate: editedTask.dueDate,
                endDate: editedTask.dueDate,
              }}
              onChange={(value) => {
                setEditedTask((prev) => {
                  return {
                    ...prev,
                    dueDate: moment(value.endDate).endOf("day").format(),
                  };
                });
              }}
              required
            />

            <div className="flex items-center gap-2">
              <button
                className="border rounded px-2 py-1 flex-1"
                onClick={() => {
                  setEditedTask(task);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 border border-green-500 rounded px-2 py-1 bg-green-400 text-white"
                onClick={() => onSaveEdit()}
              >
                Save
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskItem;
