// Libraries
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, } from 'react-router-dom'
import i18next from 'i18next';

// Actions
import { setAllProjectsOverlay, fetchGetSingleProject } from "../../store/index";

class Projects extends Component {
    render() {
        const { projects } = this.props;

        return (
            <React.Fragment>
                <section className="ftco-section ftco-project" id="projects-section">
                    <div className="container">
                        <div className="row justify-content-center pb-5">
                            <div className="col-md-12 heading-section text-center ">
                                <h1 className="big big-2">{i18next.t('projects')}</h1>
                                <h2 className="mb-4">{i18next.t('projects')}</h2>
                                <p>{i18next.t('projects_description')}</p>
                            </div>
                        </div>
                        <div className="row">
                            {
                                projects.map((project, idx) => (
                                    <div key={idx} className="col-md-6">
                                        <Link
                                            to={`/project/${project.slug}`}
                                            onClick={() => {
                                                this.props.fetchGetSingleProject(project._id);
                                            }}
                                        >
                                            <div
                                                className="project img  d-flex justify-content-center align-items-center"
                                                style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/${project.imageUrl})` }}
                                            >
                                                <div className="overlay"></div>
                                                <div className="text text-center p-4">
                                                    <h3>{project.name}</h3>
                                                    <span>{project.keywords.join(', ')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className="col-md-6 text-center">
                                <p>
                                    <button
                                        target="_blank"
                                        onClick={() => { this.props.setAllProjectsOverlay(true) }}
                                        className="btn btn-primary py-4 px-5"
                                    >
                                        {i18next.t('all_projects')}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllProjectsOverlay: (payload) => dispatch(setAllProjectsOverlay(payload)),
        fetchGetSingleProject: (payload) => dispatch(fetchGetSingleProject(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);