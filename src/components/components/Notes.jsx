import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { MdBookmarkRemove } from "react-icons/md";
import { useNotes } from "../../context/NotesContext";
import { useUser } from "../../context/userContext";
import { FaCheck } from "react-icons/fa";

const Notes = ({ openIdeas, setOpenIdeas }) => {
  //Context
  const { addIdeas, getIdeas, deletedIdea, notesIdeas, loading } = useNotes();
  const { user } = useUser();
  const { openCreateIdeas, setOpenCreateIdeas } = useNotes();

  //State
  const [arrayTasks, setArrayTasks] = useState([0, 1, 2, 3]);

  //Function
  const chanceOpenIdeas = () => {
    setOpenIdeas(!openIdeas);
    if (openIdeas) {
      setOpenCreateIdeas(false);
    }
  };

  const chanceOpenCreateIdeas = () => {
    setOpenCreateIdeas(!openCreateIdeas);
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

    const targetLength = Math.max(ideas, 4);

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
          <button
            className={openCreateIdeas ? "hover" : "none"}
            onClick={chanceOpenCreateIdeas}
          >
            <IoMdAdd />
          </button>
          <button className="open" onClick={chanceOpenIdeas}>
            <SlArrowDown />
          </button>
        </div>
      </div>
      {loading ? (
        openCreateIdeas ? (
          <form onSubmit={onSubmit}>
            <label>Add idea</label>
            <input
              type="text"
              placeholder="Ideas"
              id="ideas"
              autoComplete="off"
            />
            <button>
              <FaCheck />
            </button>
          </form>
        ) : (
          <div className="ideas-body">
            {notesIdeas &&
              arrayTasks?.map((_, i) => (
                <div key={i} className="ideas-cont">
                  <p>{notesIdeas[i]}</p>
                  {notesIdeas[i] ? (
                    <button onClick={() => deletedIdea(i)}>
                      <MdBookmarkRemove />
                    </button>
                  ) : null}
                </div>
              ))}
          </div>
        )
      ) : (
        <div className="cont-loading-task"></div>
      )}
    </div>
  );
};

export default Notes;
