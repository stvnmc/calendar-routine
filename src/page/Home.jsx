import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from "../components/styleOfPage/Grid";
import Table from "../components/styleOfPage/Table";

import { FaGithub, FaInstagram } from "react-icons/fa";
import DigitalClock from "../components/infor/DigitalClock";
import Footer from "../components/infor/Footer";

const Home = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const [style, setStyle] = useState(0);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      if (style === 0) {
        setStyle(32);
      } else if (style === 32) {
        setStyle(66);
      } else {
        setStyle(0);
      }
    }, 6000);

    return () => {
      clearTimeout(timeout1);
    };
  }, [style]);

  return (
    <>
      <div className="home">
        <div className="page-top">
          <div className="logo">
            <h1>CalenRoutine</h1>
          </div>
          <DigitalClock />
          <div className="logout">
            <button>Contact</button>
          </div>
        </div>
        <div className="first">
          <Grid />
          <div className="first-texto">
            <h1>Organize your life and your routine with CalenRoutine</h1>

            <button
              onClick={() =>
                navigate(`/calendar-routine/month/${month + 1}/${year}`)
              }
            >
              Begin
            </button>

            <div className="cont-img">
              <img
                src={
                  "https://assets-global.website-files.com/64c73d04a946980a4476537e/64cd4c2274b417b090395329_plants.png"
                }
              />
            </div>
          </div>
        </div>
        <div className="second">
          <Table />
        </div>
        <div className="third">
          <div>
            <img
              src={
                "https://assets-global.website-files.com/64c73d04a946980a4476537e/64d190c182efd7fa3c5ac033_pondering.png"
              }
            />
          </div>
          <div className="cont-text">
            <div style={{ transform: `translate(-${style}%)` }}>
              <p>
                Welcome to Calendar Routine, the ideal tool to organize your
                daily life. You can easily add events and set routines for each
                day.
              </p>
              <p>
                Organize your time efficiently with Calendar Routine. Record
                your daily activities and establish routines to optimize your
                day.
              </p>
              <p>
                Welcome to CalendarRoutine! The perfect tool for plan your daily
                activities.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
