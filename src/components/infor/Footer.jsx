import React from "react";

import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="cont-img">
        <img
          src={
            "https://assets-global.website-files.com/64c73d04a946980a4476537e/64d18f22bd4dfae30b7ea399_astro.png"
          }
        />
      </div>
      <div className="content">
        <div className="inspired">
          <h1>
            Images:
            <a href={"https://www.transhumans.xyz/images/plants"}>
              transhumans.com
            </a>
          </h1>
        </div>

        <div className="cont-links">
          <a href="https://www.instagram.com/cuatrommc/?hl=es">
            <FaGithub />
          </a>
          <a href="https://github.com/stvnmc">
            <FaInstagram />
          </a>
        </div>
        <p>&copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
