import { createContext, useContext } from "react";

export const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    console.warn(
      "userContext not found. Make sure you are using UserProvider."
    );
  }

  return context;
};

export const NotesProvider = ({ children }) => {

    



  return <NotesContext.Provider value={{}}>{children}</NotesContext.Provider>;
};
