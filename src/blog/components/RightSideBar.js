import React, { Component } from 'react'
import Categories from "./Categories";
import RecentBlog from "./RecentBlog";
import TagCloud from "./TagCloud"
import Abstract from "./Abstract"

class RightSideBar extends Component {
    render() {
        return (
            <React.Fragment>
                <Categories />
                <Abstract />
                <RecentBlog />
                <TagCloud />
            </React.Fragment>
        )
    }
}

export default RightSideBar;