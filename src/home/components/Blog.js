// Libraries
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import i18next from 'i18next';

// Actions
import { setAllPostsOverlay, fetchGetSinglePost } from "../../store/index";

class Blog extends Component {
    render() {
        const { posts } = this.props;

        console.log(posts);

        return (
            <React.Fragment>
                <section className="ftco-section" id="blog-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5 pb-5">
                            <div className="col-md-7 heading-section text-center ">
                                <h1 className="big big-2">{i18next.t('blog')}</h1>
                                <h2 className="mb-4">{i18next.t('blog')}</h2>
                                <p>{i18next.t('blog_description')}</p>
                            </div>
                        </div>
                        <div className="row d-flex">
                            {
                                posts.map((post, idx) => (
                                    <div className="col-md-4 d-flex" key={idx}>
                                        <div className="blog-entry justify-content-end">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                onClick={() => {
                                                    this.props.fetchGetSinglePost(post._id);
                                                }}
                                            >
                                                <div
                                                    className="project img block-20 d-flex justify-content-center align-items-center"
                                                    style={{
                                                        backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/${post.imageUrl})`,
                                                        marginBottom: '0px',
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
                                                <h3 className="heading"><a>{post.title}</a></h3>
                                                <p>{String(post["abstract"]).substring(0, 80)} ...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className="col-md-6 text-center">
                                <p>
                                    <button
                                        target="_blank"
                                        onClick={() => { this.props.setAllPostsOverlay(true) }}
                                        className="btn btn-primary py-4 px-5"
                                    >
                                        {i18next.t('all_posts')}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAllPostsOverlay: (payload) => dispatch(setAllPostsOverlay(payload)),
        fetchGetSinglePost: (payload) => dispatch(fetchGetSinglePost(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);