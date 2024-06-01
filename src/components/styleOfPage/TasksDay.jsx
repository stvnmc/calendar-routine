import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck, FaTasks } from "react-icons/fa";
import { MdBookmarkRemove } from "react-icons/md";

const TasksDay = ({
  month,
  year,
  type,
  infoDay,
  infoOfMonth,
  addTaskDay,
  deleteTaskDay,
  goToPageDay,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [createTask, setCreateTask] = useState(false);
  const [loading, setLoading] = useState(true);

  const chanceState = async (type, i) => {
    setLoading(false);
    if (typeof type !== "undefined" && type === "add") {
      if (inputValue) {
        await addTaskDay(year, month, infoDay, inputValue);
      }
      setInputValue("");
      setCreateTask(false);
    } else {
      await deleteTaskDay(year, month, infoDay, i);
    }

    setLoading(true);
  };

  const chanceCreateTask = () => {
    setCreateTask(!createTask);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      chanceState("add");
    }
  };

  return (
    <div className="select-day-taks">
      <div className="task-cont-header">
        <h1>Day: {infoDay}</h1>
        {type === "current" && (
          <div className="icons-add-rutine">
            <button onClick={() => goToPageDay(infoDay)}>
              <FaTasks />
            </button>

            <button
              className={createTask ? "hover" : "none"}
              onClick={() => chanceCreateTask()}
            >
              <IoMdAdd />
            </button>
          </div>
        )}
      </div>
      {loading ? (
        createTask ? (
          <div className="create-task">
            <input
              type="text"
              value={inputValue}
              placeholder="Task"
              onChange={(event) => setInputValue(event.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <button className="add" onClick={() => chanceState("add")}>
              <FaCheck />
            </button>
          </div>
        ) : (
          <div className="tasks">
            {infoOfMonth[infoDay] ? (
              <>
                {infoOfMonth[infoDay]?.map((item, i) => (
                  <div key={i} className="cont-tasks">
                    <h2>{item}</h2>
                    <button
                      className="delete"
                      onClick={() => chanceState("delete", i)}
                    >
                      <MdBookmarkRemove />
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="welcome-text">
                <button onClick={() => chanceCreateTask()}>
                  Crea una tarea
                </button>
                <img
                  src={
                    "https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64cd4d0d89236fc80a3395b4_runner.png"
                  }
                />
              </div>
            )}
          </div>
        )
      ) : (
        <div className="cont-loading-task"></div>
      )}
    </div>
  );
};

export default TasksDay;
