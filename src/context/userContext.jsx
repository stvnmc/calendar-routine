import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { dbAuth } from "../firebase/config";

export const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);

  if (!context) {
    console.warn(
      "userContext not found. Make sure you are using UserProvider."
    );
  }

  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const [location, setLocation] = useState("");
  const [locationDate, setLocationDate] = useState(null);

  const localStore = (name, accessToken) => {
    const newInfo = [{ name: name, accessCalendar: accessToken }];
    localStorage.setItem("Calendar", JSON.stringify(newInfo));
  };

  async function signup(email, password) {
    try {
      const res = await createUserWithEmailAndPassword(dbAuth, email, password);
      const emailParts = res.user.email.split("@");

      const username = emailParts[0];
      setUser(username);

      localStore(username, res.user.accessToken);
      return true;
    } catch (error) {
      console.log(error);
      let errorMessage = error.code;
      if (error.code.startsWith("auth/")) {
        errorMessage = error.code.slice(5);
      }
      errorMessage = errorMessage.replace(/-/g, " ");
      setErrors(errorMessage);
    }
  }

  async function signin(email, password) {
    try {
      const res = await signInWithEmailAndPassword(dbAuth, email, password);

      const emailParts = res.user.email.split("@");
      const username = emailParts[0];
      setUser(username);

      localStore(username, res.user.accessToken);
    } catch (error) {
      let errorMessage = error.code;
      if (error.code.startsWith("auth/")) {
        errorMessage = error.code.slice(5);
      }
      errorMessage = errorMessage.replace(/-/g, " ");
      setErrors(errorMessage);
    }
  }

  async function logout() {
    try {
      await signOut(dbAuth);
      setUser(null);
      localStorage.removeItem("Calendar");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  async function firstTime() {
    await signin("Welcome@gmail.com", "12345678");
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const storedInfo = localStorage.getItem("Calendar");
    if (storedInfo !== null) {
      const info = JSON.parse(storedInfo);
      const name = info[0].name;

      setUser(name);
      return;
    }
    firstTime();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        signup,
        signin,
        errors,
        logout,
        location,
        setLocation,
        setLocationDate,
        locationDate,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
