import React from "react";
import {Link} from "react-router-dom";

const Navigation = (): JSX.Element => (
  <React.Fragment>
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link to="/create">Create</Link>
        </li>
        <li className="nav-item ml-auto pr-3 pt-3 pb-3">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  </React.Fragment>
);

export default Navigation;
