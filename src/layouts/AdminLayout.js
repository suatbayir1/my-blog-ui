// Libraries
import React, { Component } from 'react';
import { AppWrapper } from '@influxdata/clockface';
import { Router, Route, Switch } from "react-router-dom";

// Helpers
import { history } from "../history";

// Containers
import Sidebar from "../sidebar/containers/Sidebar";
import Logout from "../auth/containers/Logout";
import CategoryContainer from '../admin/containers/CategoryContainer';
import PostsContainer from '../admin/containers/PostsContainer';
import CreatePost from '../admin/components/CreatePost';

class AdminLayout extends Component {
    render() {
        return (
            <>
                <AppWrapper>
                    <Sidebar />

                    <Router history={history}>
                        <Switch>
                            <Route exact path="/admin/category" component={CategoryContainer} />
                            <Route exact path="/admin/posts" component={PostsContainer} />
                            <Route exact path="/admin/post/:type" component={CreatePost} />
                            <Route exact path="/admin/logout" component={Logout} />
                        </Switch>
                    </Router>
                </AppWrapper>
            </>
        )
    }
}

export default AdminLayout;