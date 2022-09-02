import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import App from "./App";
import Create from "./Create";
import Navigation from "./Navigation";
import SinglePost from "./SinglePost";

const NotFound = (): JSX.Element => <h1 style={{textAlign: "center", marginTop: "80px"}}>Page Not Found</h1>;

const Routes = (): JSX.Element => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/create" exact={true} component={Create} />
          <Route path="/post/:slug" exact={true} component={SinglePost} />
          <Route path="/*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
