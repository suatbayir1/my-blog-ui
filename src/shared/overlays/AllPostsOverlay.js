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
import FilterElements from '../../blog/components/FilterElements';

// Actions
import { setAllPostsOverlay, fetchGetSinglePost, fetchGetAllCategories } from "../../store/index";

// Utilities
import { filterPostsBySearchTerm, filterPostsByCategory } from "../utils/filter";
import { sortPosts } from '../utils/sort';

class AllPostsOverlay extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filteredPosts: [],
        }
    }

    async componentDidMount() {
        await this.props.fetchGetAllCategories();
        this.setState({
            filteredPosts: this.props.allPosts
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allPosts !== this.props.allPosts) {
            this.setState({
                filteredPosts: this.props.allPosts
            })
        }
    }

    filterPosts = (searchTitle, sortType, category) => {
        const { allPosts } = this.props;
        let posts = JSON.parse(JSON.stringify(allPosts));

        posts = filterPostsBySearchTerm(posts, searchTitle);
        posts = sortPosts(posts, sortType);
        posts = filterPostsByCategory(posts, category.label);

        this.setState({
            filteredPosts: posts
        })
    }

    render() {
        const { filteredPosts } = this.state;
        const { visible } = this.props;

        return (
            <Overlay visible={visible}>
                <Overlay.Container maxWidth={1500}>
                    <Form onSubmit={this.submit}>
                        <Overlay.Header
                            title={i18next.t('all_posts')}
                            onDismiss={() => { this.props.setAllPostsOverlay(false) }}
                        />
                        <Overlay.Body>
                            <Grid>
                                <Grid.Row>
                                    <FilterElements
                                        filterPosts={this.filterPosts}
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
                                            filteredPosts.length > 0 ?
                                                <Grid>
                                                    {
                                                        filteredPosts.map((post, idx) =>
                                                            <Grid.Column widthSM={Columns.Four}
                                                                key={idx}
                                                            >
                                                                <div className="blog-entry justify-content-end">
                                                                    <Link
                                                                        to={`/blog/${post.slug}`}
                                                                        onClick={() => {
                                                                            this.props.fetchGetSinglePost(post._id);
                                                                            this.props.setAllPostsOverlay(false)
                                                                        }}
                                                                    >
                                                                        <div
                                                                            className="project img block-20 d-flex justify-content-center align-items-center"
                                                                            style={{
                                                                                backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/${post.imageUrl})`,
                                                                                marginBottom: '0px'
                                                                            }}
                                                                        >
                                                                            <div className="overlay"></div>
                                                                            <div className="text text-center p-4">
                                                                                <h3>{post.category}</h3>
                                                                                <span>{post.keywords.join(', ')}</span>
                                                                            </div>
                                                                        </div>
                                                                    </Link>

                                                                    <div className="text mt-3 float-right d-block">
                                                                        <div className="d-flex align-items-center mb-3 meta">
                                                                            <p className="mb-0">
                                                                                <span className="mr-2">{new Date(post.createdAt).toLocaleString()} </span>
                                                                                <span className="mr-2"><b>{post.author.name}</b></span>
                                                                                <span className="meta-chat"><span className="icon-chat"></span> {post.comments.length}</span>
                                                                            </p>
                                                                        </div>
                                                                        <h3 className="heading"><a href="single.html">{post.title}</a></h3>
                                                                        <p>{String(post["abstract"]).substring(0, 120)} ...</p>
                                                                    </div>
                                                                </div>
                                                            </Grid.Column>
                                                        )
                                                    }
                                                </Grid>
                                                :
                                                <EmptyState size={ComponentSize.Large}>
                                                    <EmptyState.Text>
                                                        <b>{i18next.t('empty_post')}</b>
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
                                onClick={() => { this.props.setAllPostsOverlay(false) }}
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
        visible: state.general.visibleAllPostsOverlay,
        allPosts: state.post.allPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllPostsOverlay: (payload) => dispatch(setAllPostsOverlay(payload)),
        fetchGetSinglePost: (payload) => dispatch(fetchGetSinglePost(payload)),
        fetchGetAllCategories: (payload) => dispatch(fetchGetAllCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPostsOverlay);