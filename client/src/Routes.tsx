import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import App from "./App";
import CreatePost from "./CreatePost";
import Login from "./Login";
import Navigation from "./Navigation";
import PrivateRoute from "./PrivateRoute";
import SinglePost from "./SinglePost";
import UpdatePost from "./UpdatePost";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/login" exact={true} component={Login} />
          <PrivateRoute path="/create" exact={true} component={CreatePost} />
          <Route path="/post/:slug" exact={true} component={SinglePost} />
          <PrivateRoute path="/post/update/:slug" exact={true} component={UpdatePost} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
