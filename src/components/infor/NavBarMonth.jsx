import React, { useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { useUser } from "../../context/userContext";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const NavBarMonth = () => {
  const { user, logout, location, locationDate } = useUser();
  const [openSetting, setOpenSetting] = useState(false);
  const divRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setOpenSetting(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

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
    return `/calendar-routine/m/${nuevaFecha[0]}/d/${nuevaFecha[1]}/y/${nuevaFecha[2]}`;
  };

  const conditionalStyle = () => {
    const translateMap = {
      home: "0px",
      month: "121px",
      routine: "240px",
    };

    return { transform: `translateX(${translateMap[location]})` };
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
        <Link to={goToPageDay()}>
          <h1 className={location === "routine" ? "hover" : ""}>Routine</h1>
        </Link>
      </div>
      <div className={`user-setting ${openSetting ? "hover" : ""}`}>
        <h1>{user}</h1>
        <button onClick={() => setOpenSetting(true)}>
          <IoIosSettings />
        </button>
        {openSetting && (
          <div className="setting" ref={divRef}>
            <div onClick={() => console.log("hla")}></div>
            <h2>Dark modo</h2>
            <h2>Contact me</h2>
            <div className="linea"></div>
            <h2 onClick={logout}>Logout</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarMonth;
