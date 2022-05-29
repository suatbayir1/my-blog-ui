// Libraries
import React, { Component } from 'react'
import { connect } from "react-redux";
import i18next from 'i18next';

// Constants
import image from "../../assets/images/background1.png";

class About extends Component {
    render() {
        const { user, allProjects } = this.props;

        return (
            <section className="ftco-about img ftco-section ftco-no-pb" id="about-section">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-md-6 col-lg-5 d-flex">
                            <div className="img-about img d-flex align-items-stretch">
                                <div className="overlay"></div>
                                <div
                                    className="img d-flex align-self-stretch align-items-center"
                                    style={{ backgroundImage: "url(" + image + ")", maxHeight: '700px' }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-7 pl-lg-5 pb-5">
                            <div className="row justify-content-start pb-3">
                                <div className="col-md-12 heading-section ">
                                    <h1 className="big">{i18next.t('about_me')}</h1>
                                    <h2 className="mb-4">{i18next.t('about_me')}</h2>
                                    <p>{i18next.t('about_me_abstract')}</p>
                                    <ul className="about-info mt-4 px-md-0 px-2">
                                        <li className="d-flex"><span>{i18next.t('name')}:</span> <span>{user.name}</span></li>
                                        <li className="d-flex"><span>{i18next.t('birthdate')}:</span> <span>Haziran 16, 1998</span></li>
                                        <li className="d-flex"><span>{i18next.t('address')}:</span> <span>İskenderun, Hatay</span></li>
                                        <li className="d-flex"><span>{i18next.t('title')}:</span> <span>Bilgisayar Mühendisi</span></li>
                                        <li className="d-flex"><span>{i18next.t('email')}:</span> <span>{user.email}</span></li>
                                        <li className="d-flex"><span>{i18next.t('phone')}: </span> <span>0543 372 37 69</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="counter-wrap  d-flex mt-md-3">
                                <div className="text">
                                    <p className="mb-4">
                                        <span className="number" data-number="120">{allProjects.length || 0}</span>
                                        <span> {i18next.t('project_complete')}</span>
                                    </p>
                                    <p><a href="/files/cv.pdf" download className="btn btn-primary py-3 px-3">{i18next.t('download_cv')}</a></p>
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
        user: state.user.user,
        allProjects: state.project.allProjects
    };
};

export default connect(mapStateToProps, null)(About);