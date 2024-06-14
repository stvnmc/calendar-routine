import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Month from "./page/Month";
import Day from "./page/Day";
import CreateRoutine from "./page/CreateRoutine";
import NavBarMonth from "./components/infor/NavBarMonth";

function App() {
  return (
    <BrowserRouter>
      <NavBarMonth />
      <Routes>
        <Route path="/calendar-routine" element={<Home />} />

        <Route path="/calendar-routine/month/:id1/:id2" element={<Month />} />
        <Route
          path="/calendar-routine/m/:id1/d/:id2/y/:id3"
          element={<Day />}
        />
        <Route
          path="/calendar-routine/create-routine"
          element={<CreateRoutine />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
