
import React from "react";

import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
