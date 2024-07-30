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
        <div className="cont-links">
          <h2>Social Media :</h2>
          <a href="https://github.com/stvnmc">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/cuatrommc/?hl=es">
            <FaInstagram />
          </a>
        </div>

        <div className="inspired">
          <h2>
            Images:
            <a
              href={"https://www.transhumans.xyz/images/plants"}
              target="_blank"
              rel="noopener noreferrer"
            >
              transhumans.com
            </a>
          </h2>
        </div>
        <div>
          <p> Create by: Steven Marchena caballero</p>
          <p>&copy; 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
