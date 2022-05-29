// Libraries
import i18next from 'i18next';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { fetchGetSinglePost } from "../../store/index";

class RecentBlog extends Component {
    render() {
        const { posts } = this.props;

        console.log(posts);

        return (
            <React.Fragment>
                <div className="sidebar-box ">
                    <h3 className="heading-sidebar">{i18next.t('recent_posts')}</h3>

                    {
                        posts.map((post, idx) => (
                            <div className="block-21 mb-4 d-flex" key={idx}>
                                <a
                                    className="blog-img mr-4"
                                    style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/${post.imageUrl})` }}
                                ></a>
                                <div className="text">
                                    <h3
                                        className="heading"
                                        style={{ marginTop: '0px', fontWeight: 100 }}
                                    >
                                        <Link
                                            style={{ fontWeight: 200 }}
                                            to={`/blog/${post.slug}`}
                                            onClick={() => {
                                                this.props.fetchGetSinglePost(post._id);
                                            }}
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <div className="meta">
                                        <div><a href="/#"><span className="icon-calendar"></span> {new Date(post.createdAt).toLocaleString()}</a></div>
                                        <div><a href="/#"><span className="icon-person"></span> {post.author.name}</a></div>
                                        <div><a href="/#"><span className="icon-chat"></span> {post.comments.length}</a></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetSinglePost: (payload) => dispatch(fetchGetSinglePost(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentBlog);