import { createContext, useContext, useState } from "react";
import { useUser } from "./userContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
  // Contexr
  const { user } = useUser();

  const [notesIdeas, setNotesIdeas] = useState(null);
  const [openCreateIdeas, setOpenCreateIdeas] = useState(false);
  const [loading, setLoading] = useState(false);

  const getIdeas = async () => {
    if (!user || typeof user !== "string") {
      return;
    }

    if (user === "welcome") {
      console.log("es igual");
    }

    setLoading(false);

    const collectionName = user + "ideas";

    const ress = await collectionExists(collectionName);

    const docRef = doc(collection(db, collectionName), "ideas");

    if (!ress) {
      await setDoc(docRef, { 0: "cuatromc" });
      return;
    }

    const resInfoIdeas = await getDoc(docRef);

    setNotesIdeas(resInfoIdeas.data());

    setLoading(true);

    return;
  };

  const addIdeas = async (value) => {
    if (value === "") return;

    setLoading(false);

    const collectionName = user + "ideas";

    const docRef = doc(collection(db, collectionName), "ideas");
    const resInfoIdeas = await getDoc(docRef);

    const data = resInfoIdeas.data();

    if (data[0] === "cuatromc") {
      await setDoc(docRef, { 0: value });
      return;
    }

    const newIndex = Object.keys(data).length;
    data[newIndex] = value;

    await setDoc(docRef, data);

    await getIdeas();

    setOpenCreateIdeas(false);

    return;
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

  // Edit ideas

  async function deletedIdea(index) {
    setLoading(false);
    const collectionName = user + "ideas";

    const docRef = doc(collection(db, collectionName), "ideas");
    const resInfoIdeas = await getDoc(docRef);

    const data = resInfoIdeas.data();

    const updatedIdeas = {};
    let newIndex = 0;
    for (let key in data) {
      if (parseInt(key) !== index) {
        updatedIdeas[newIndex] = data[key];
        newIndex++;
      }
    }

    await setDoc(docRef, updatedIdeas);
    await getIdeas();
  }

  return (
    <NotesContext.Provider
      value={{
        addIdeas,
        getIdeas,
        openCreateIdeas,
        setOpenCreateIdeas,
        deletedIdea,
        notesIdeas,
        setNotesIdeas,
        loading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
