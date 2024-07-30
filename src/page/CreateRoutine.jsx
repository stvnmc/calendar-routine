import React, { useEffect, useState } from "react";
import { useRoutine } from "../context/RoutineContext";

// import

import { dayHours, dayNames, Hours } from "../components/infor/MonthsDays";
import InputTextCR from "../components/InputTextCR";
import { useNavigate } from "react-router-dom";

import { TbPointFilled } from "react-icons/tb";

const CreateRoutine = () => {
  //   context
  const {
    createRoutine,
    setWeekend,
    weekend,
    openSFD,
    setOpenSFD,
    RoutineWorkday,
    RoutineWeekend,
    setRoutineWorkday,
    setRoutineWeekend,
    addInfoRoutine,
    currentValueInputText,
    setCurrentValueInputText,
    setStages,
    stages,
    addRoutine,
    currentDay,
  } = useRoutine();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentDay.id1) {
      navigate(`/calendar-routine`);
    }

    setRoutineWorkday(Hours());
    setRoutineWeekend(Hours());
  }, []);

  const navigate = useNavigate();

  const isDaySelected = (index) => {
    return weekend.includes(index);
  };

  const retroceder = () => {
    window.history.back();
  };

  const nextStage = () => {
    setLoading(false);
    setTimeout(() => {
      if (openSFD) {
        if (stages === "weekend") {
          const res = addRoutine();
          if (res) {
            const nuevaFecha = `/calendar-routine/m/${currentDay.id1}/d/${currentDay.id2}/y/${currentDay.id3}`;
            navigate(nuevaFecha);
          }
        } else {
          setStages("weekend");
          setCurrentValueInputText("");
        }
      } else {
        createRoutine();
      }
      setLoading(true);
    }, 100);
  };

  const previousStage = () => {
    setLoading(false);
    setTimeout(() => {
      if (stages === "workday") {
        setOpenSFD(false);
      }
      if (stages === "weekend") {
        setStages("workday");
        setCurrentValueInputText("");
      }
      setLoading(true);
    }, 100);
  };

  const addWeekedDay = (i) => {
    if (!weekend.includes(i)) {
      setWeekend((prevFreeDays) => [...prevFreeDays, i]);
    } else {
      setWeekend((prevFreeDays) => prevFreeDays.filter((day) => day !== i));
    }
  };

  useEffect(() => {
    console.log(openSFD);
  }, [openSFD]);

  return (
    <div className="cont-create">
      <div className="steps-to-follow">
        <div className="steps-info">
          {openSFD ? (
            stages === "weekend" ? (
              <div className={`${loading ? "visible" : "on-visible"}`}>
                <h1>Add information about your {stages} routine</h1>
                <img
                  src={
                    "https://assets-global.website-files.com/64c73d04a946980a4476537e/64d9c64fb20aa28a2850f036_chaotic-good.png"
                  }
                />
              </div>
            ) : (
              <div className={`${loading ? "visible" : "on-visible"}`}>
                <h1>Add information about your {stages} routine</h1>
                <img
                  src={
                    "https://assets-global.website-files.com/64c73d04a946980a4476537e/64cd4b0849333dd65b9525a6_coffee.png"
                  }
                />
              </div>
            )
          ) : (
            <div className={`${loading ? "visible" : "on-visible"}`}>
              <h1>Select rest days:</h1>
              <img
                src={
                  "https://assets-global.website-files.com/64c73d04a946980a4476537e/64cd4b9bf0da0e3228caa6d0_growth.png"
                }
              />
            </div>
          )}
        </div>
        {openSFD ? (
          <div className="next-previous">
            <button onClick={previousStage}>previous</button>
            <button onClick={nextStage}>next</button>
          </div>
        ) : (
          <div className="next-previous">
            <button onClick={retroceder}>Back</button>
            <button onClick={nextStage}>next</button>
          </div>
        )}
        <div className="steps">
          <TbPointFilled className={openSFD ? "" : "here"} />
          <TbPointFilled
            className={openSFD ? (stages === "weekend" ? "" : "here") : ""}
          />
          <TbPointFilled
            className={openSFD ? (stages === "weekend" ? "here" : "") : ""}
          />
        </div>
      </div>
      {openSFD ? (
        <div className="add-info-routine">
          <div className="hours">
            {dayHours().map((hourObj, index, completed) => (
              <InputTextCR
                hourObj={hourObj}
                key={index}
                addInfoRoutine={addInfoRoutine}
                setCurrentValueInputText={setCurrentValueInputText}
                currentValueInputText={currentValueInputText}
                RoutineWorkday={RoutineWorkday}
                RoutineWeekend={RoutineWeekend}
                stages={stages}
                completed={completed}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="select-routine">
          {dayNames.map((dayName, index) => (
            <div
              key={index}
              className={
                isDaySelected(index) ? "days-create selected" : "days-create"
              }
              onClick={() => addWeekedDay(index)}
            >
              <h1>{dayName}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateRoutine;
