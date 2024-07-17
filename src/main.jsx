import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MonthDataProvider } from "./context/MonthDataContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { RoutineProvider } from "./context/RoutineContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <MonthDataProvider>
      <RoutineProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </RoutineProvider>
    </MonthDataProvider>
  </UserProvider>
);
