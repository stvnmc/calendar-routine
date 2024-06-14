import React from "react";
import { BiCalendarEvent } from "react-icons/bi";

const DayContainer = ({
  dayNumber,
  dayOfWeek,
  type,
  loadingMonth,
  setDaySelect,
  handleMonthChange,
  infoOfMonth,
  daySelect,
  setloadingTextDayTask,
}) => {
  const addSelectDay = () => {
    setloadingTextDayTask(false);

    setTimeout(() => {
      if (type === "former") {
        handleMonthChange(-1);
      } else if (type === "next") {
        handleMonthChange(1);
      }
      setDaySelect(dayNumber);
      localStorage.setItem("selectDay", dayNumber);

      setloadingTextDayTask(true);
    }, 100);
  };

  return (
    <div
      className={`containers ${type} ${
        daySelect === dayNumber ? "hover-day-select" : ""
      }`}
      style={{ gridColumn: `${dayOfWeek ? dayOfWeek + 1 : 1}` }}
      onClick={() => addSelectDay()}
    >
      {loadingMonth ? (
        <>
          {infoOfMonth && type === "current" && infoOfMonth.length > 0 && (
            <div className="icon-task-have">
              <BiCalendarEvent />
            </div>
          )}

          <h1>{dayNumber}</h1>
        </>
      ) : (
        <div className="cont-loading"></div>
      )}
    </div>
  );
};

export default DayContainer;
