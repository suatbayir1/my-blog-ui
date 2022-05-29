import i18next from 'i18next';
import React, { Component } from 'react'
import { connect } from "react-redux"

class Abstract extends Component {
    render() {
        const { selectedPost } = this.props;

        return (
            <React.Fragment>
                <div className="sidebar-box ">
                    <h3 className="heading-sidebar">{i18next.t('abstract')}</h3>
                    <p>{selectedPost?.abstract}</p>
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

export default connect(mapStateToProps, null)(Abstract);