import React, { Children, useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { useUser } from "../../context/userContext";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";

const NavBarMonth = () => {
  // Context
  const { user, logout, location, locationDate, isAuthenticated } = useUser();
  // State
  const [openSetting, setOpenSetting] = useState(false);
  const [openLoadingRegister, setOpenLoadingRegister] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const modo = localStorage.getItem("mode");
    return modo;
  });

  const divRef = useRef(null);
  const divLoginRegisterRef = useRef(null);
  const navigate = useNavigate();

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Effect
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLoginRegister);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideLoginRegister
      );
    };
  }, []);

  useEffect(() => {
    if (darkMode === "light-mode") {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("mode", "light-mode");
    } else {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("mode", "dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    if (loadingRegister) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [loadingRegister]);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenSetting(false);
    }
  };

  const handleClickOutsideLoginRegister = (event) => {
    if (
      divLoginRegisterRef.current &&
      !divLoginRegisterRef.current.contains(event.target)
    ) {
      setOpenLoadingRegister(false);
      document.body.style.overflowY = "overlay";
    }
  };

  const goToPageDay = () => {
    const daySave = localStorage.getItem("selectDay");

    let nuevaFecha = [];

    if (locationDate) {
      nuevaFecha = locationDate;
    } else {
      if (daySave) {
        nuevaFecha = [month, daySave, year];
      } else {
        nuevaFecha = [month, day, year];
      }
    }

    if (isAuthenticated) {
      navigate(
        `/calendar-routine/m/${nuevaFecha[0]}/d/${nuevaFecha[1]}/y/${nuevaFecha[2]}`
      );
    } else {
      document.body.style.overflowY = "hidden";
      setOpenLoadingRegister(true);
      setLoadingRegister(true);
    }
  };

  const conditionalStyle = () => {
    const translateMap = {
      home: "0px",
      month: "121px",
      routine: "240px",
    };

    return { transform: `translateX(${translateMap[location]})` };
  };

  const chanceOpenLoadingRegister = (value) => {
    document.body.style.overflowY = "hidden";
    setOpenLoadingRegister(true);
    setLoadingRegister(value);
  };

  const chanceLoadingRegister = () => {
    document.body.style.overflowY = "overlay";
    setOpenLoadingRegister(false);
  };

  const chanceDarkModo = () => {
    if (darkMode === "light-mode") setDarkMode("dark-mode");
    if (darkMode === "dark-mode") setDarkMode("light-mode");
  };

  return (
    <div className="top-bar-calendario">
      <DigitalClock />
      <div className="router">
        <div className="linea-navBar" style={conditionalStyle()}></div>
        <Link to="/calendar-routine">
          <h1 className={location === "home" ? "hover" : ""}>Home</h1>
        </Link>
        <Link to={`/calendar-routine/month/${month + 1}/${year}`}>
          <h1 className={location === "month" ? "hover" : ""}>Calendar</h1>
        </Link>

        <h1
          onClick={goToPageDay}
          className={location === "routine" ? "hover" : ""}
        >
          Routine
        </h1>
      </div>
      <div className={`user-setting ${openSetting ? "hover" : ""}`}>
        {!openSetting && <h1>{user}</h1>}
        <button onClick={() => setOpenSetting(true)}>
          <IoIosSettings />
        </button>
        {openSetting && (
          <div className="setting" ref={divRef}>
            <div onClick={() => console.log("hla")}></div>
            <h2 onClick={chanceDarkModo}>Dark modo</h2>
            <h2>Chance Spanish</h2>
            <div className="linea"></div>
            {user === "welcome" ? (
              <>
                <h2 onClick={() => chanceOpenLoadingRegister(true)}>Login</h2>
                <h2 onClick={() => chanceOpenLoadingRegister(false)}>
                  Register
                </h2>
              </>
            ) : (
              <h2 onClick={logout}>Logout</h2>
            )}
          </div>
        )}
      </div>
      {openLoadingRegister ? (
        loadingRegister ? (
          <Login
            setLoadingRegister={setLoadingRegister}
            chanceLoadingRegister={chanceLoadingRegister}
            divLoginRegisterRef={divLoginRegisterRef}
          >
            {Children}
          </Login>
        ) : (
          <Register
            setLoadingRegister={setLoadingRegister}
            chanceLoadingRegister={chanceLoadingRegister}
            divLoginRegisterRef={divLoginRegisterRef}
            year={year}
            month={month}
          >
            {Children}
          </Register>
        )
      ) : null}
    </div>
  );
};

export default NavBarMonth;
