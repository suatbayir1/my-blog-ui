
// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux';

import LinkHeader from "../../shared/components/LinkHeader";
import Footer from "../../shared/components/Footer";
import BlogDetail from "../components/BlogDetail";
import Breadcrumb from '../components/Breadcrumb';

// Actions
import { fetchGetCategories } from "../../store/general/generalActions";

class BlogPageContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.fetchGetCategories(5);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedPost !== this.props.selectedPost) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <React.Fragment>
                <LinkHeader />
                <Breadcrumb />
                <BlogDetail />
                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
        selectedPost: state.post.selectedPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetCategories: (payload) => dispatch(fetchGetCategories(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPageContainer);