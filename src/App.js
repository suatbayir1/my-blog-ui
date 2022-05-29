// Libraries
import React, { Component } from 'react'
import { Router, Route, Switch } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

// Helpers
import { history } from "./history";

// Layouts
import AuthLayout from './layouts/AuthLayout'
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Containers
import OverlayContainer from "./shared/containers/OverlayContainer";

// HOC
import PrivateRoute from "./router/PrivateRoute";

class App extends Component {
  render() {
    return (
      <>
        <NotificationContainer />
        <Router history={history}>
          <OverlayContainer />
          <Switch>
            <Route exact path="/sign-in" component={AuthLayout} />
            {/* <Route exact path="/sign-up" component={AuthLayout} /> */}
            <PrivateRoute path="/admin" component={AdminLayout} />
            <Route path="/" component={UserLayout} />
          </Switch>
        </Router>
      </>
    )
  }
}

export default App