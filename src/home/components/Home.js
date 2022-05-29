import React, { Component } from 'react'
import image1 from "../../assets/images/background4.png";
import i18next from 'i18next';
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const { user } = this.props;

        return (
            <section id="home-section" className="hero">
                <div className="home-slider  owl-carousel" style={{ textAlign: 'center' }}>
                    <div className="slider-item ">
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row d-md-flex no-gutters slider-text justify-content-end" data-scrollax-parent="true">
                                <div
                                    className="one-third js-fullheight order-md-last img"
                                    style={{ backgroundImage: "url(" + image1 + ")" }}
                                >
                                    <div className="overlay"></div>
                                </div>
                                <div className="one-forth d-flex align-items-center" data-scrollax=" properties: { translateY: '70%' }">
                                    <div className="text">
                                        <span className="subheading">{i18next.t('home.greeting')}!</span>
                                        <h1 className="mb-4 mt-3">{i18next.t('home.whoami')} <span>{user.name}</span></h1>
                                        <h2 className="mb-4">{i18next.t('home.title')}</h2>
                                        <div id="ftco-nav">
                                            <p>
                                                <a
                                                    href="#contact-section"
                                                    className="btn btn-primary py-3 px-4"
                                                >
                                                    {i18next.t('contact_me')}
                                                </a>
                                                <a
                                                    href="#projects-section"
                                                    className="btn btn-white btn-outline-white py-3 px-4"
                                                >
                                                    {i18next.t('projects')}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

export default connect(mapStateToProps, null)(Home);