import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { useNotes } from "../../context/NotesContext";
import { useUser } from "../../context/userContext";

const Notes = ({ openIdeas, setOpenIdeas }) => {
  const { addIdeas, getIdeas } = useNotes();
  const { user } = useUser();

  const [openCreateIdeas, setOpenCreateIdeas] = useState(false);
  const [notesIdeas, setNotesIdeas] = useState(null);
  const [arrayTasks, setArrayTasks] = useState([0, 1, 2, 3]);

  const chanceOpenIdeas = () => {
    setOpenIdeas(!openIdeas);
  };

  const chanceOpenCreateIdeas = () => {
    setOpenCreateIdeas(true);
    setOpenIdeas(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addIdeas(e.target.ideas.value);
  };

  const getInfoIdeas = async () => {
    const res = await getIdeas();
    setNotesIdeas(res);
  };

  useEffect(() => {
    getInfoIdeas();
  }, [user]);

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
            <input type="text" placeholder="ideas" id="ideas" />
            <button>add</button>
          </form>
        ) : (
          <div className="ideas-body">
            {notesIdeas &&
              arrayTasks?.map((item) => <p key={item}>{notesIdeas[item]}</p>)}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Notes;
