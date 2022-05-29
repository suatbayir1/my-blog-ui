// Libraries
import React, { Component } from 'react';
import { AppWrapper } from '@influxdata/clockface';
import { Router, Route, Switch } from "react-router-dom";

// Helpers
import { history } from "../history";

// Containers
import Sidebar from "../sidebar/containers/Sidebar";
import Logout from "../auth/containers/Logout";
import HomePageContainer from "../home/containers/HomePageContainer"
import BlogPageContainer from "../blog/containers/BlogPageContainer";
import ProjectPageContainer from "../project/containers/ProjectPageContainer";

class UserLayout extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/blog/:id" component={BlogPageContainer} />
                    <Route exact path="/project/:id" component={ProjectPageContainer} />
                    <Route exact path="/" component={HomePageContainer} />
                </Switch>
            </Router>
        )
    }
}

export default UserLayout;