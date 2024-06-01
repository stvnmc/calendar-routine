import React from "react";
import DigitalClock from "./DigitalClock";
import { CiLogout } from "react-icons/ci";
import { useUser } from "../../context/userContext";

const NavBarMonth = () => {
  const { user, logout } = useUser();
  return (
    <div className="top-bar-calendario">
      <div className="logo">
        <h1>CalenRoutine</h1>
      </div>
      <DigitalClock />
      <div className="user-control">
        <h2>{user}</h2>
        <button onClick={logout} className="user-button">
          <CiLogout />
        </button>
      </div>
    </div>
  );
};

export default NavBarMonth;
