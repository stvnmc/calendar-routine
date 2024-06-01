import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./page/Home";
import Month from "./page/Month";
import Day from "./page/Day";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "./ProtectedRouter";
import RegisterPage from "./page/RegisterPage";
import CreateRoutine from "./page/CreateRoutine";
import NavBarMonth from "./components/infor/NavBarMonth";

function App() {
  return (
    <BrowserRouter>
      <NavBarMonth />
      <Routes>
        <Route path="/calendar-routine/register" element={<RegisterPage />} />
        <Route path="/calendar-routine/login" element={<LoginPage />} />

        <Route path="/calendar-routine" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/calendar-routine/month/:id1/:id2" element={<Month />} />
          <Route
            path="/calendar-routine/m/:id1/d/:id2/y/:id3"
            element={<Day />}
          />
          <Route
            path="/calendar-routine/create-routine"
            element={<CreateRoutine />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
