import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";

const Notes = ({ openIdeas, setOpenIdeas }) => {
  const [openCreateIdeas, setOpenCreateIdeas] = useState(false);

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

  const chanceOpenCreateIdeas = () => {
    setOpenCreateIdeas(true);
    setOpenIdeas(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
  };

  return (
    <div className={`ideas ${openIdeas ? "open" : ""}`}>
      <div className="ideas-top">
        <h2>Ideas</h2>
        <div className="cont-button">
          <button onClick={chanceOpenCreateIdeas}>
            <IoMdAdd />
          </button>
          <button className="open" onClick={chanceOpenIdeas}>
            <SlArrowDown />
          </button>
        </div>
      </div>
      {openIdeas ? (
        openCreateIdeas ? (
          <form onSubmit={onSubmit}>
            <label>add idea</label>
            <input type="text" placeholder="ideas" />
            <button>add</button>
          </form>
        ) : (
          <div className="ideas-body">
            {notes.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
