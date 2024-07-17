import React from "react";

const Notes = () => {
  const notes = ["1", "2", "3"];
  return (
    <div>
      <h2>ideas</h2>
      <div>
        {notes.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Notes;
