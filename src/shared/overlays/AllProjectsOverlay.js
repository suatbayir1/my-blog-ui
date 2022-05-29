// Libraries
import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import { Link, } from 'react-router-dom'
import i18next from 'i18next';

// Components
import {
    Overlay, Form, Grid, Button, ComponentColor,
    ButtonType, ComponentStatus, IconFont, Columns,
    DapperScrollbars, EmptyState, ComponentSize,
} from '@influxdata/clockface';
import FilterElements from '../../project/components/FilterElements';

// Actions
import { setAllProjectsOverlay, fetchGetSingleProject, fetchGetAllCategories } from "../../store/index";

// Utilities
import { filterProjectsByName, filterProjectsByKeyword } from "../utils/filter";
import { sortProjects } from '../utils/sort';

class AllProjectsOverlay extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filteredProjects: [],
        }
    }

    async componentDidMount() {
        await this.props.fetchGetAllCategories();
        this.setState({
            filteredProjects: this.props.allProjects
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allProjects !== this.props.allProjects) {
            this.setState({
                filteredProjects: this.props.allProjects
            })
        }
    }

    filterProjects = (searchTitle, sortType, keyword) => {
        const { allProjects } = this.props;
        let projects = JSON.parse(JSON.stringify(allProjects));

        projects = filterProjectsByName(projects, searchTitle);
        projects = sortProjects(projects, sortType);
        projects = filterProjectsByKeyword(projects, keyword);

        this.setState({
            filteredProjects: projects
        })
    }

    render() {
        const { filteredProjects } = this.state;
        const { visible } = this.props;

        return (
            <Overlay visible={visible}>
                <Overlay.Container maxWidth={1500}>
                    <Form onSubmit={this.submit}>
                        <Overlay.Header
                            title={i18next.t('all_projects')}
                            onDismiss={() => { this.props.setAllProjectsOverlay(false) }}
                        />
                        <Overlay.Body>
                            <Grid>
                                <Grid.Row>
                                    <FilterElements
                                        filterProjects={this.filterProjects}
                                    />
                                </Grid.Row>

                                <Grid.Row>
                                    <DapperScrollbars
                                        autoHide={false}
                                        autoSizeHeight={true}
                                        style={{ maxHeight: '570px' }}
                                        className="data-loading--scroll-content"
                                    >
                                        {
                                            filteredProjects.length > 0 ?
                                                <Grid>
                                                    {
                                                        filteredProjects.map((project, idx) =>
                                                            <Grid.Column widthSM={Columns.Four}
                                                                key={idx}
                                                            >
                                                                <Link
                                                                    to={`/project/${project.slug}`}
                                                                    onClick={() => {
                                                                        this.props.fetchGetSingleProject(project._id);
                                                                        this.props.setAllProjectsOverlay(false)
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
                                                            </Grid.Column>
                                                        )
                                                    }
                                                </Grid>
                                                :
                                                <EmptyState size={ComponentSize.Large}>
                                                    <EmptyState.Text>
                                                        <b>{i18next.t('empty_project')}</b>
                                                    </EmptyState.Text>
                                                </EmptyState>
                                        }
                                    </DapperScrollbars>
                                </Grid.Row>
                            </Grid>
                        </Overlay.Body>
                        <Overlay.Footer>
                            <Button
                                text={i18next.t('close_window')}
                                icon={IconFont.Remove}
                                color={ComponentColor.Default}
                                status={ComponentStatus.Default}
                                type={ButtonType.Submit}
                                onClick={() => { this.props.setAllProjectsOverlay(false) }}
                            />
                        </Overlay.Footer>
                    </Form>
                </Overlay.Container>
            </Overlay>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.general.visibleAllProjectsOverlay,
        allProjects: state.project.allProjects,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllProjectsOverlay: (payload) => dispatch(setAllProjectsOverlay(payload)),
        fetchGetSingleProject: (payload) => dispatch(fetchGetSingleProject(payload)),
        fetchGetAllCategories: () => dispatch(fetchGetAllCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProjectsOverlay);