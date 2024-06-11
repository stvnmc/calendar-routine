import React, { useState } from "react";
//icons

import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { BsX } from "react-icons/bs";
import { useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosStar } from "react-icons/io";

const Routine = ({
  hour,
  period,
  style,
  routine,
  setNewRoutineDay,
  dayExists,
  loading,
}) => {
  const [completTask, setCompletTask] = useState(routine?.completed);

  useEffect(() => {
    setCompletTask(routine?.completed);
  }, [routine]);

  const chanceStateTask = () => {
    if (completTask) {
      setNewRoutineDay(hour, false);
    } else {
      setNewRoutineDay(hour, true);
    }
    setCompletTask(!completTask);
  };

  const renderTaskSection = () => {
    if (!routine?.task) return null;

    return (
      <div className="task-routine">
        <h2>{routine?.task}</h2>
        {dayExists && (
          <button
            onClick={chanceStateTask}
            className={completTask ? "none" : "incomplet"}
          >
            {completTask ? <BsX /> : <IoIosCheckmark />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`hour ${period} ${!loading ? "" : "loading"}`}
      style={style}
    >
      {loading ? (
        <>
          <div className={`title-hour ${completTask ? "none" : "incomplet"}`}>
            <h1>{hour}:00</h1>
            {completTask ? (
              <IoIosStar />
            ) : period === "early-Morning" || period === "night" ? (
              <IoMdMoon />
            ) : (
              <MdWbSunny />
            )}
          </div>
          {renderTaskSection()}
        </>
      ) : (
        <div className="cont-loading"></div>
      )}
    </div>
  );
};

export default Routine;
