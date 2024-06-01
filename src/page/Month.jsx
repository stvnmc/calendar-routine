import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { dayNames, monthsNames } from "../components/infor/MonthsDays";

import DayContainer from "../components/DayContainer";

import { useMonthData } from "../context/MonthDataContext";
import { useUser } from "../context/userContext";
import { getInfoCalendar } from "../components/FunctionGetCalendar";
import Footer from "../components/infor/Footer";
import TasksDay from "../components/styleOfPage/TasksDay";

const Month = () => {
  const { id1, id2 } = useParams();

  const navigate = useNavigate();
  const [infoCalendar, setinfoCalendar] = useState([]);
  const [daySelect, setDaySelect] = useState(1);

  const {
    loadingMonth,
    setLoadingMonth,
    infoOfMonth,
    getInfoTaskDay,
    addTaskDay,
    deleteTaskDay,
  } = useMonthData();

  const { user } = useUser();

  useEffect(() => {
    getCalendar();
    getInfoTasksClandarar();
    getDaySeledt();
  }, [user, id1]);

  const getDaySeledt = () => {
    const daySave = localStorage.getItem("selectDay");

    if (daySave) {
      setDaySelect(parseInt(daySave));
    } else {
      const currentDate = new Date();
      const day = currentDate.getDate();
      setDaySelect(day);
    }
  };

  const getCalendar = async () => {
    const calendarInfo = await getInfoCalendar(id1, id2);
    setinfoCalendar(calendarInfo);
  };

  const handleMonthChange = (delta) => {
    let newId = parseInt(id1) + delta;
    let newYear = id2;

    if (newId < 1) {
      newId = 12;
      newYear--;
    } else if (newId > 12) {
      newId = 1;
      newYear++;
    }

    const nuevaFecha = `/calendar-routine/month/${newId}/${newYear}`;
    navigate(nuevaFecha);
  };

  const goToPageDay = (day) => {
    setLoadingMonth(false);
    const nuevaFecha = `/calendar-routine/m/${id1}/d/${day}/y/${id2}`;
    navigate(nuevaFecha);
  };

  const getInfoTasksClandarar = async () => {
    setLoadingMonth(false);
    await getInfoTaskDay(id2, id1);
    setLoadingMonth(true);
  };

  return (
    <div className="container">
      <div className="main-container-month">
        <div className="calendar">
          <div className="date">
            <h2>
              {monthsNames[id1 - 1]} {id2}
            </h2>
            <div className="icons-calendar">
              <button onClick={() => handleMonthChange(1)}>
                <SlArrowDown />
              </button>
              <button onClick={() => handleMonthChange(-1)}>
                <SlArrowUp />
              </button>
            </div>
          </div>
          <div className="days-of-week">
            {dayNames.map((dayName, index) => (
              <h2 key={index}>{dayName}</h2>
            ))}
          </div>
          <div className="days">
            {infoCalendar?.map(({ dayNumber, dayOfWeek, type }, index) => (
              <DayContainer
                key={index}
                dayNumber={dayNumber}
                type={type}
                dayOfWeek={dayOfWeek}
                handleMonthChange={handleMonthChange}
                loadingMonth={loadingMonth}
                setDaySelect={setDaySelect}
                infoOfMonth={infoOfMonth[dayNumber]}
                daySelect={daySelect}
              />
            ))}
          </div>
        </div>

        <TasksDay
          month={id1}
          year={id2}
          addTaskDay={addTaskDay}
          infoDay={daySelect}
          infoOfMonth={infoOfMonth}
          deleteTaskDay={deleteTaskDay}
          type={"current"}
          goToPageDay={goToPageDay}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Month;
