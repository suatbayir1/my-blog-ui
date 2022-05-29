// Libraries
import i18next from 'i18next';
import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";

// Utils
import { validateEmail } from "../../shared/utils/validation";

// Actions
import { fetchAddComment } from "../../store/index";

class PostComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            website: "",
            message: "",
        }
    }

    addComment = async (e) => {
        e.preventDefault();

        const { name, email, website, message } = this.state;
        const { selectedPost } = this.props;

        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            NotificationManager.error(i18next.t('empty_form'), i18next.t('warning'), 3000);
            return;
        }

        if (message.length > 500) {
            NotificationManager.error(i18next.t('message_max_500_chracter'), i18next.t('warning'), 3000);
            return;
        }

        if (!validateEmail(this.state.email)) {
            NotificationManager.error(i18next.t('invalid_email'), i18next.t('error'), 3000);
            return;
        }

        const payload = {
            name,
            email,
            website,
            message
        }

        await this.props.fetchAddComment(selectedPost._id, payload);
    }

    render() {
        const { name, email, website, message } = this.state;

        return (
            <React.Fragment>
                <div className="comment-form-wrap pt-5">
                    <h3 className="mb-5">{i18next.t('leave_a_comment')}</h3>
                    <form action="#" onSubmit={this.addComment} className="p-5 bg-dark">
                        <div className="form-group">
                            <label htmlFor="name">{i18next.t('name')} *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={name}
                                onChange={(e) => { this.setState({ name: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{i18next.t('email')} *</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">{i18next.t('website')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="website"
                                value={website}
                                onChange={(e) => { this.setState({ website: e.target.value }) }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">{i18next.t('message')} *</label>
                            <textarea
                                name=""
                                id="message"
                                cols="30"
                                rows="10"
                                className="form-control"
                                value={message}
                                onChange={(e) => { this.setState({ message: e.target.value }) }}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <input type="submit" value={i18next.t('post_comment')} className="btn py-3 px-4 btn-primary" />
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.post.selectedPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddComment: (id, payload) => dispatch(fetchAddComment(id, payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);