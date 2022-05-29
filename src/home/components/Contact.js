// Libraries
import React, { Component } from 'react'
import { connect } from "react-redux"
import i18next from 'i18next';

import about from "../../assets/images/background1.png";
import { NotificationManager } from 'react-notifications';

// Actions
import { fetchSendMessageToAdmin } from "../../store/index";

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    sendMessage = async () => {
        const { name, email, subject, message } = this.state;

        if (name.trim() === "" || email.trim() === "" || subject.trim() === "" || this.state.message.trim() === "") {
            NotificationManager.error(i18next.t('empty_form'), i18next.t('warning'), 3000);
            return;
        }

        if (!this.validateEmail(this.state.email)) {
            NotificationManager.error(i18next.t('invalid_email'), i18next.t('error'), 3000);
            return;
        }

        const payload = {
            "name": this.state.name,
            "email": this.state.email,
            "subject": this.state.subject,
            "message": this.state.message
        }

        await this.props.fetchSendMessageToAdmin(payload);
    }

    clearForm = () => {
        this.setState({
            name: "",
            email: "",
            subject: "",
            message: "",
        })
    }

    render() {
        return (
            <React.Fragment>
                <section className="ftco-section contact-section ftco-no-pb" id="contact-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5 pb-3">
                            <div className="col-md-7 heading-section text-center ">
                                <h1 className="big big-2">{i18next.t('contact')}</h1>
                                <h2 className="mb-4">{i18next.t('contact')}</h2>
                                <p>{i18next.t('contact_description')}</p>
                            </div>
                        </div>

                        <div className="row d-flex contact-info mb-5">
                            <div className="col-md-6 col-lg-3 d-flex ">
                                <div className="align-self-stretch box p-4 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="icon-map-signs"></span>
                                    </div>
                                    <h3 className="mb-4">{i18next.t('address')}</h3>
                                    <p>İskenderun, Hatay</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex ">
                                <div className="align-self-stretch box p-4 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="icon-phone2"></span>
                                    </div>
                                    <h3 className="mb-4">{i18next.t('phone')}</h3>
                                    <p><a href="tel://1234567920">0543 372 37 69</a></p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex ">
                                <div className="align-self-stretch box p-4 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="icon-paper-plane"></span>
                                    </div>
                                    <h3 className="mb-4">{i18next.t('email')}</h3>
                                    <p><a href="mailto:info@yoursite.com">suatbayir1@gmail.com</a></p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex ">
                                <div className="align-self-stretch box p-4 text-center">
                                    <div className="icon d-flex align-items-center justify-content-center">
                                        <span className="icon-globe"></span>
                                    </div>
                                    <h3 className="mb-4">{i18next.t('website')}</h3>
                                    <p><a href="#">www.suatbayir.com</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="row no-gutters block-9">
                            <div className="col-md-6 order-md-last d-flex">
                                <form className="bg-light p-4 p-md-5 contact-form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`${i18next.t('your_name')} (*)`}
                                            value={this.state.name}
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`${i18next.t('your_email')} (*)`}
                                            value={this.state.email}
                                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`${i18next.t('subject')} (*)`}
                                            value={this.state.subject}
                                            onChange={(e) => { this.setState({ subject: e.target.value }) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name=""
                                            id=""
                                            cols="30"
                                            rows="7"
                                            className="form-control"
                                            placeholder={`${i18next.t('message')} (*)`}
                                            value={this.state.message}
                                            onChange={(e) => { this.setState({ message: e.target.value }) }}
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="button"
                                            onClick={() => { this.sendMessage() }}
                                            value={i18next.t('send_message')}
                                            className="btn btn-primary py-3 px-5"
                                        />
                                    </div>
                                </form>

                            </div>

                            <div className="col-md-6 d-flex">
                                <div className="img" style={{ backgroundImage: "url(" + about + ")" }}></div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSendMessageToAdmin: (payload) => dispatch(fetchSendMessageToAdmin(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);