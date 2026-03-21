import { useState, useEffect } from "react";
import { StickyNote } from "lucide-react";
import { Cross, Trash } from "lucide-react";
import Image from "./assets/page.png"

const App = () => {

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [task, setTask] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTask(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...task];
    copyTask.push({ title, detail });
    setTask(copyTask)

    setDetail("");
    setTitle("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...task];

    copyTask.splice(idx, 1);
    setTask(copyTask);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col py-7 px-2 justify-between ">
      <span className="flex flex-row justify-start items-center gap-2 -mt-6 p-2 pl-4">
        <StickyNote size={30} />
        <span className="text-3xl">Notes App</span>
      </span>

      <div className="h-full flex flex-col lg:flex-row gap-2">
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex items-start flex-col gap-5 p-5 lg:w-1/2"
        >
          <input
            type="text"
            placeholder="Enter Task"
            className="px-5 py-2 w-full border-2 rounded-lg "
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Enter Details"
            className="px-5 py-2 w-full border-2 rounded-lg h-20"
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          ></textarea>

          <button className="bg-white w-full text-center px-5 py-2 rounded-lg text-black">
            Add Note
          </button>
        </form>

        <div className="flex  flex-col overflow-auto rounded-2xl lg:w-1/2  ">
          <div
            className="flex flex-wrap justify-start  items-center rounded-2xl overflow-auto pb-4 pl-7"
            id="note"
          >
            {task.map(function (elem, idx) {
              return (
                <div
                  key={idx}
                  className="h-52 w-44 bg-cover overflow-auto text-black " style={{backgroundImage: `url(${Image})`}}
                  id="page"
                >
                  <div className="flex flex-row justify-between p-5">
                   <h1 className="text-md font-bold leading-tight">
                    {elem.title}
                  </h1>
                  <p
                    onClick={() => {
                      deleteNote(idx);
                    }}
                  >
                    <Trash className="text-red-600" />
                  </p>
                  </div>
                  <p className="text-xs -mt-4 text-mist-600 px-4 pr-5 break-words">{elem.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
