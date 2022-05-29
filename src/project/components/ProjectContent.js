// Libraries
import React, { Component } from 'react';
import { connect } from "react-redux";
import i18next from 'i18next';

class ProjectContent extends Component {
    render() {
        const { selectedProject } = this.props;

        if (Object.keys(selectedProject).length === 0) {
            return <></>;
        }

        return (
            <React.Fragment>
                <div className="sidebar-box" style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                    <h3 className="heading-sidebar" style={{ marginTop: '0px' }}>{i18next.t('project_information')}</h3>
                    <ul className="categories" >
                        <li>{i18next.t('name')}: {selectedProject?.name}</li>
                        <li>{i18next.t('category')}: {selectedProject?.keywords.join(", ")}</li>
                        <li>{i18next.t('start_date')}: {new Date(selectedProject?.startedAt).toLocaleString()}</li>
                        <li>{i18next.t('finish_date')}: {new Date(selectedProject?.finishedAt).toLocaleString()}</li>
                        <li>
                            <a href={selectedProject.projectUrl} target="_blank" style={{ color: '#bec2cc' }}>
                                {i18next.t('project_url')}: {selectedProject?.projectUrl}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-box " style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                    <h3 className="heading-sidebar">{i18next.t('abstract')}</h3>
                    <p>{selectedProject?.content}</p>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedProject: state.project.selectedProject
    };
};

export default connect(mapStateToProps, null)(ProjectContent);