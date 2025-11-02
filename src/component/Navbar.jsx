import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faCalendarDays, faEnvelope } from "@fortawesome/free-regular-svg-icons";

import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="menus">
        <ul>
          <li className="items">
            <i>
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
          </li>
          <li className="items">
            <i>
              <FontAwesomeIcon icon={faCalendarDays} />
            </i>
          </li>
          <li className="items on">
            <i>
              <FontAwesomeIcon icon={faAddressBook} />
            </i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
