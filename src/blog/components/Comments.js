// Libraries
import React, { Component } from 'react'
import { connect } from "react-redux";

// Components
import { EmptyState, ComponentSize, } from '@influxdata/clockface';
import i18next from 'i18next';

class Comments extends Component {
    render() {
        const { selectedPost } = this.props;

        if (Object.keys(selectedPost).length === 0) {
            return <></>;
        }

        return (
            <React.Fragment>
                {
                    selectedPost.comments.length > 0 ?
                        <div className="pt-5 mt-5">
                            <h3 className="mb-5">{selectedPost.comments.length} {i18next.t('comments')}</h3>
                            <ul className="comment-list">
                                {
                                    selectedPost.comments.map((comment, idx) => (
                                        <li className="comment" key={idx}>
                                            <div className="vcard bio">
                                                <img src="/images/default_user.jpg" alt="Image placeholder" />
                                            </div>
                                            <div className="comment-body">
                                                <h3 style={{ marginTop: 0 }}>{comment.name}</h3>
                                                <div className="meta">{new Date(comment.createdAt).toLocaleString()}</div>
                                                <p>{comment.message}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        :
                        <EmptyState size={ComponentSize.Large}>
                            <EmptyState.Text>
                                <b>{i18next.t('empty_comments')}</b>
                            </EmptyState.Text>
                        </EmptyState>
                }

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.post.selectedPost,
    };
};

export default connect(mapStateToProps, null)(Comments);