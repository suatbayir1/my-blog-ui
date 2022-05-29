import i18next from 'i18next';
import React, { Component } from 'react'
import imageBackground from "../../assets/images/bg_1.jpg";

class Freelance extends Component {
    render() {
        return (
            <section className="ftco-section ftco-hireme img margin-top" style={{ backgroundImage: "url(" + imageBackground + ")" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 text-center">
                            <h2><span>{i18next.t('open_to_work')}</span></h2>
                            <h5>{i18next.t('open_to_work_message')}</h5>
                            <div id="ftco-nav">
                                <p className="mb-0"><a href="#contact-section" className="btn btn-primary py-3 px-5"> {i18next.t('contact_me')}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Freelance;