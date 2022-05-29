import i18next from 'i18next';
import React, { Component } from 'react'
import { connect } from "react-redux"
import { HashLink as Link } from 'react-router-hash-link';

// Actions
import { setAllPostsOverlay, } from "../../store/index";

class TagCloud extends Component {
    render() {
        const { selectedPost } = this.props;

        if (Object.keys(selectedPost).length === 0) {
            return <></>;
        }

        return (
            <React.Fragment>
                <div className="sidebar-box ">
                    <h3 className="heading-sidebar">{i18next.t('tag_cloud')}</h3>
                    <div className="tagcloud">
                        {
                            selectedPost.keywords.map((tag, idx) =>
                                <Link
                                    key={idx}
                                    to="/#blog-section" className="tag-cloud-link"
                                    onClick={() => {
                                        this.props.setAllPostsOverlay(true);
                                    }}
                                >
                                    {tag}
                                </Link>
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.post.selectedPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllPostsOverlay: (payload) => dispatch(setAllPostsOverlay(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCloud);