import { useEffect, useState } from "react";
import "./App.css";
import TasksList from "./page";
import Filters from "./components/filter";
import TaskItem from "./components/task-item";
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { addTask } from "./redux/tasks";

function App() {
  const tasks = useSelector((state) => state.tasksList);
  const filter = useSelector((state) => state.filterOption);
  const dispatch = useDispatch();

  const [taskList, setTaskList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [taskInput, setTaskInput] = useState({
    title: "",
    dueDate: {
      startDate: null,
      endDate: null,
    },
  });

  useEffect(() => {
    let temp = tasks?.tasks?.filter((task) => {
      if (filter.filter_type === "all") {
        return true;
      } else if (filter.filter_type === "todo") {
        return task.status === "To Do";
      } else if (filter.filter_type === "inprogress") {
        return task.status === "In Progress";
      } else if (filter.filter_type === "done") {
        return task.status === "Done";
      }
      return true
    });

    temp = temp.sort((a, b) => {
      if (filter.sort_type === "default") {
        return moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1;
      } else if (filter.sort_type === "due") {
        if (a.status === "Done") {
          return 1;
        }
        return moment(a.dueDate).isBefore(moment(b.dueDate)) ? -1 : 1;
      }

      return 0;
    });

    setTaskList(temp);
  }, [tasks.tasks, filter.filter_type, filter.sort_type]);

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: taskInput.title,
      status: "To Do",
      createdAt: moment().format(),
      dueDate: moment(taskInput.dueDate.endDate).endOf("day").format(),
      id: moment().format("x"),
    };

    dispatch(addTask(payload));
    resetForm();
    setIsAdding(false);
  };

  const resetForm = () => {
    setTaskInput({
      title: "",
      dueDate: {
        startDate: null,
        endDate: null,
      },
    });
  };

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto border rounded-xl p-4 min-h-full shadow bg-white">
        {!isAdding && (
          <div className="text-end">
            <button
              className="px-2 py-1 border border-blue-800 rounded bg-blue-400 text-white w-20"
              onClick={() => setIsAdding(true)}
            >
              + Add
            </button>
          </div>
        )}
        <div
          className={`mb-2 relative transition transition-all transform duration-500 ease-in ${
            !isAdding ? "overflow-hidden h-0" : "z-[1]"
          }`}
        >
          <div className={`py-2 border-b `}>
            <form
              onReset={() => {
                resetForm();
                setIsAdding(false);
              }}
              onSubmit={onSubmit}
            >
              <div className="bg-white flex items-center gap-4 mb-2">
                <div className="flex-1 flex items-center gap-2">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    type="text"
                    className="border w-full px-2 py-1 rounded outline-0"
                    value={taskInput.title}
                    onChange={(event) =>
                      setTaskInput((prev) => {
                        return { ...prev, title: event.target.value };
                      })
                    }
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="dueDate">Due Date</label>
                  <Datepicker
                    containerClassName={"relative"}
                    inputClassName={
                      "relative transition-all duration-300 py-1 pl-2 pr-10 w-full outline-0 rounded border tracking-wide font-light placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed"
                    }
                    inputId="dueDate"
                    useRange={false}
                    asSingle={true}
                    displayFormat="DD/MM/YYYY"
                    minDate={new Date()}
                    value={taskInput.dueDate}
                    onChange={(value) => {
                      setTaskInput((prev) => {
                        return { ...prev, dueDate: value };
                      });
                    }}
                    required
                  />
                </div>
              </div>
              <div className="text-end">
                <button className="border rounded px-4 py-1 ml-4" type="reset">
                  Cancel
                </button>
                <button
                  className="border rounded px-4 py-1 ml-4 bg-blue-400 text-white"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <Filters />
        <br />
        <TasksList>
          {taskList.map((task, index) => {
            return (
              <TaskItem key={task.title + index} task={task} index={index} />
            );
          })}
        </TasksList>
      </div>
    </main>
  );
}

export default App;
