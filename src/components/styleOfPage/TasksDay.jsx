import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { MdBookmarkRemove } from "react-icons/md";
import { dayNames } from "../infor/MonthsDays";

const TasksDay = ({
  month,
  year,
  type,
  infoDay,
  infoOfMonth,
  addTaskDay,
  deleteTaskDay,
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

  const date = new Date(year, month - 1, infoDay);
  const dayOfWeek = date.getDay();

  return (
    <div className="select-day-taks">
      <div className="task-cont-header">
        <h1>
          {dayNames[dayOfWeek]} - {infoDay}
        </h1>
        {type === "current" && (
          <div className="icons-add-rutine">
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
            {infoOfMonth[infoDay] && infoOfMonth[infoDay].length > 0 ? (
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
                <h2 onClick={() => chanceCreateTask()}>Crea una tarea</h2>
                <img
                  src={
                    "https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64cd4d0d89236fc80a3395b4_runner.png"
                  }
                />
                <div className="lines">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="lines-second">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="lines-third">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="lines-fourth">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
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
