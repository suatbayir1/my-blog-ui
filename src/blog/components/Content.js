import React, { Component } from 'react'
import PostComment from "./PostComment"
import Comments from "./Comments"
import AboutAuthor from "./AboutAuthor"
import PostContent from "./PostContent"

export default class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {}
        }
    }

    render() {
        return (
            <React.Fragment>
                <PostContent post={this.state.post} />
                <AboutAuthor authorID={this.state.post.author} />
                <Comments />
                <PostComment />
            </React.Fragment>
        )
    }
}
