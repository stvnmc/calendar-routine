import { createContext, useContext } from "react";
import { useUser } from "./userContext";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
  const { user } = useUser();

  const getIdeas = async () => {
    if (!user || typeof user !== "string") {
      return;
    }

    const collectionName = user + "ideas";

    const ress = await collectionExists(collectionName);

    const docRef = doc(collection(db, collectionName), "ideas");

    if (!ress) {
      await setDoc(docRef, { 0: "" });
      return;
    }

    const resInfoIdeas = await getDoc(docRef);

    return resInfoIdeas.data();
  };

  const addIdeas = async (value) => {
    const collectionName = user + "ideas";

    const docRef = doc(collection(db, collectionName), "ideas");
    const resInfoIdeas = await getDoc(docRef);

    const data = resInfoIdeas.data();
  };

  async function collectionExists(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return !querySnapshot.empty;
    } catch (error) {
      console.error(
        "Error al verificar la existencia de la colección:",
        error.message
      );
      return false;
    }
  }

  return (
    <NotesContext.Provider value={{ addIdeas, getIdeas }}>
      {children}
    </NotesContext.Provider>
  );
};
