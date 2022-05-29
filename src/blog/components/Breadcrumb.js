// Libraries
import i18next from 'i18next';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';

// Constants
import image1 from "../../assets/images/bg_1.jpg";

class Breadcrumb extends Component {
    render() {
        const { selectedPost } = this.props;

        return (
            <section className="hero-wrap js-fullheight" style={{ backgroundImage: "url(" + image1 + ")", height: '100%' }} data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center" style={{ height: '100vh' }}>
                        <div className="col-md-12 pb-5 mb-3 text-center">
                            <h1 className="mb-3 bread">{selectedPost?.title}</h1>
                            <p className="breadcrumbs">
                                <span className="mr-2">
                                    <Link to="/#home-section">{i18next.t('homepage')} <i className="ion-ios-arrow-forward"></i></Link>
                                </span>
                                <span className="mr-2">
                                    <Link to="/#blog-section">{i18next.t('blog')} <i className="ion-ios-arrow-forward"></i></Link>
                                </span>
                                <span>{selectedPost?.title} <i className="ion-ios-arrow-forward"></i></span></p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPost: state.post.selectedPost
    };
};

export default connect(mapStateToProps, null)(Breadcrumb);