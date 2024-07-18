import React from "react";
import { SlArrowDown } from "react-icons/sl";

const Notes = ({ openIdeas, setOpenIdeas }) => {
  const notes = [
    "Dsad a ssdDsa dassdD sada ssdDsa da ssd Dsadassd Dsadass dDsadas sdDsadassd",
    "dsadas",
    "dsadas",
    "dsadas",
    "dsadas",
    "dsadas",
    "dsadas",
    "dsadas",
    "dsadas",
  ];

  const chanceOpenIdeas = () => {
    setOpenIdeas(!openIdeas);
  };

  return (
    <div className={`ideas ${openIdeas ? "open" : ""}`}>
      <div className="ideas-top">
        <h2>Ideas</h2>

        <button onClick={chanceOpenIdeas}>
          <SlArrowDown />
        </button>
      </div>
      {openIdeas ? (
        <div className="ideas-body">
          {notes.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
