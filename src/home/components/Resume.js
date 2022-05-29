// Libraries
import React, { Component } from 'react'
import i18next from 'i18next';

class Resume extends Component {
    render() {
        return (
            <div>
                <section className="ftco-section ftco-no-pb" id="resume-section">
                    <div className="container">
                        <div className="row justify-content-center pb-5">
                            <div className="col-md-10 heading-section text-center ">
                                <h1 className="big big-2">{i18next.t('resume')}</h1>
                                <h2 className="mb-4">{i18next.t('resume')}</h2>
                                <p>{i18next.t('resume_description')}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="resume-wrap ">
                                    <span className="date">{i18next.t('resume_history.dakik_iotiq.date')}</span>
                                    <h2>{i18next.t('resume_history.dakik_iotiq.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.dakik_iotiq.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.dakik_iotiq.text')}</p>
                                </div>
                                <div className="resume-wrap">
                                    <span className="date">{i18next.t('resume_history.tsoft_full.date')}</span>
                                    <h2>{i18next.t('resume_history.tsoft_full.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.tsoft_full.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.tsoft_full.text')}</p>
                                </div>
                                <div className="resume-wrap ">
                                    <span className="date">{i18next.t('resume_history.bachelor.date')}</span>
                                    <h2>{i18next.t('resume_history.bachelor.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.bachelor.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.bachelor.text')}</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="resume-wrap">
                                    <span className="date">{i18next.t('resume_history.master.date')}</span>
                                    <h2>{i18next.t('resume_history.master.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.master.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.master.text')}</p>
                                </div>
                                <div className="resume-wrap ">
                                    <span className="date">{i18next.t('resume_history.tsoft_part.date')}</span>
                                    <h2>{i18next.t('resume_history.tsoft_part.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.tsoft_part.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.tsoft_part.text')}</p>
                                </div>
                                <div className="resume-wrap ">
                                    <span className="date">{i18next.t('resume_history.high.date')}</span>
                                    <h2>{i18next.t('resume_history.high.title')}</h2>
                                    <span className="position">{i18next.t('resume_history.high.place')}</span>
                                    <p className="mt-4">{i18next.t('resume_history.high.text')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-5">
                            <div className="col-md-6 text-center">
                                <p><a href="https://europa.eu/!MW67Um" target="_blank" className="btn btn-primary py-4 px-5">{i18next.t('europass_cv')}</a></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Resume;