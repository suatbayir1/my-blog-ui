// Libraries
import React, { Component } from 'react'

// Components
import LinkHeader from "../../shared/components/LinkHeader";
import Footer from "../../shared/components/Footer";
import ProjectDetail from "../components/ProjectDetail";


class ProjectPageContainer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <React.Fragment>
                <LinkHeader />
                <ProjectDetail />
                <Footer />
            </React.Fragment>
        )
    }
}
export default ProjectPageContainer;