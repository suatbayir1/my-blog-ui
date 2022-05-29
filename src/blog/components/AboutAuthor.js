import i18next from 'i18next';
import React, { Component } from 'react'
import { connect } from "react-redux"
class AboutAuthor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: {},
        }
    }

    render() {
        const { user } = this.props;

        return (
            <React.Fragment>
                <div className="about-author d-flex p-4 bg-dark">
                    <div className="bio mr-5">
                        <img
                            src={`${process.env.REACT_APP_IMAGES_URL}/${user?.profileImage}`}
                            alt="Image placeholder"
                            className="img-fluid mb-4"
                            style={{ maxHeight: '500px' }}
                        />
                    </div>
                    <div className="desc">
                        <h3 style={{ marginTop: 0 }}>{user?.name}</h3>
                        <p>{i18next.t('about_author')}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};


export default connect(mapStateToProps, null)(AboutAuthor);