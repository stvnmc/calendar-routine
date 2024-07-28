import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { useNotes } from "../../context/NotesContext";
import { useUser } from "../../context/userContext";

const Notes = ({ openIdeas, setOpenIdeas }) => {
  const { addIdeas, getIdeas, deletedIdea, notesIdeas } = useNotes();

  //Context
  const { user } = useUser();
  const { openCreateIdeas, setOpenCreateIdeas } = useNotes();

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

  useEffect(() => {
    getIdeas();
  }, [user]);

  useEffect(() => {
    if (!notesIdeas) return;

    const ideas = Object.keys(notesIdeas).length;

    const targetLength = Math.max(ideas, 3);

    setArrayTasks((prevArrayTasks) => {
      if (targetLength > prevArrayTasks.length) {
        return [
          ...prevArrayTasks,
          ...Array.from(
            { length: targetLength - prevArrayTasks.length },
            (_, i) => prevArrayTasks.length + i
          ),
        ];
      } else if (targetLength < prevArrayTasks.length) {
        return prevArrayTasks.slice(0, targetLength);
      }
      return prevArrayTasks;
    });
  }, [notesIdeas]);

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
              arrayTasks?.map((_, i) => (
                <div key={i}>
                  <p>{notesIdeas[i]}</p>
                  {notesIdeas[i] ? (
                    <button onClick={() => deletedIdea(i)}>dele</button>
                  ) : null}
                </div>
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
