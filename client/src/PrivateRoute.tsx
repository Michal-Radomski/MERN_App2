import React from "react";
import {Route, Redirect} from "react-router-dom";

import {getUser} from "./helpers";

const PrivateRoute = ({component: Component, ...rest}: any): JSX.Element => {
  // console.log({Component});
  // console.log({rest});
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          getUser() ? <Component {...props} /> : <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        }
      />
    </React.Fragment>
  );
};

export default PrivateRoute;
