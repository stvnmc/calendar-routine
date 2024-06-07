import React, { useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { CiLogout } from "react-icons/ci";
import { useUser } from "../../context/userContext";
import { IoIosSettings } from "react-icons/io";

import { useLocation } from "react-router-dom";

const NavBarMonth = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const pathname = location.pathname;
  const segments = pathname.split("/");

  const primerSegmento = segments[1];

  const [openSetting, setOpenSetting] = useState(false);

  const divRef = useRef(null);

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

  return (
    <div className="top-bar-calendario">
      <DigitalClock />
      <div className="router">
        <h1>home</h1>
        <h1 className={primerSegmento === "calendar-routine" ? "hover" : ""}>
          calendar
        </h1>
        <h1>routine</h1>
      </div>
      <div className={`user-setting ${openSetting ? "hover" : ""}`}>
        <h1>{user}</h1>
        <button onClick={() => setOpenSetting(!openSetting)}>
          <IoIosSettings />
        </button>
        {openSetting && (
          <div className="setting" ref={divRef}>
            <h2>Dark modo</h2>

            {/* <button onClick={() => setOpenSetting(false)}>close</button> */}
            <div className="linea"></div>
            <h2 onClick={logout}>logout</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarMonth;
