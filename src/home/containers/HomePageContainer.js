// Libraries
import React, { Component } from 'react';
import { connect } from "react-redux";

// Components
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import Home from "../../home/components/Home";
import About from "../../home/components/About"
import Resume from "../../home/components/Resume"
import Services from "../../home/components/Services"
import Skills from "../../home/components/Skills"
import Projects from "../../home/components/Projects"
import Blog from "../../home/components/Blog";
import Counter from "../../home/components/Counter";
import Freelance from "../../home/components/Freelance";
import Contact from "../../home/components/Contact";

// Actions
import {
    fetchProfile, fetchGetProjects, fetchGetAllProjects,
    fetchGetPosts, fetchGetAllPosts
} from "../../store/index";

class HomePageContainer extends Component {
    async componentDidMount() {
        const {
            fetchProfile, fetchGetProjects, fetchGetAllProjects,
            fetchGetPosts, fetchGetAllPosts
        } = this.props;

        await fetchProfile();
        await fetchGetProjects(4);
        await fetchGetAllProjects();
        await fetchGetPosts(3);
        await fetchGetAllPosts();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <Home />
                <About />
                <Resume />
                <Services />
                <Skills />
                <Projects />
                <Blog />
                <Counter />
                <Freelance />
                <Contact />
                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProfile: () => dispatch(fetchProfile()),
        fetchGetProjects: (payload) => dispatch(fetchGetProjects(payload)),
        fetchGetAllProjects: () => dispatch(fetchGetAllProjects()),
        fetchGetPosts: (payload) => dispatch(fetchGetPosts(payload)),
        fetchGetAllPosts: () => dispatch(fetchGetAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);