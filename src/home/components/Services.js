import React, { Component } from 'react'
import i18next from 'i18next';

class Services extends Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [
                { name: "computer_vision", icon: "flaticon-analysis" },
                { name: "machine_learning", icon: "flaticon-flasks" },
                { name: "deep_learning", icon: "flaticon-ideas" },
                { name: "ai", icon: "flaticon-analysis" },
                { name: "web_development", icon: "flaticon-flasks" },
                { name: "web_design", icon: "flaticon-ideas" },
            ]
        }
    }

    render() {
        const { services } = this.state;

        return (
            <section className="ftco-section" id="services-section">
                <div className="container">
                    <div className="row justify-content-center py-5 mt-5">
                        <div className="col-md-12 heading-section text-center ">
                            <h1 className="big big-2">{i18next.t('services')}</h1>
                            <h2 className="mb-4">{i18next.t('services')}</h2>
                            <p>{i18next.t('services_description')}</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            services.map((service, idx) => (
                                <div className="col-md-4 text-center d-flex " key={idx}>
                                    <a href="#" className="services-1">
                                        <span className="icon">
                                            <i className={service.icon}></i>
                                        </span>
                                        <div className="desc">
                                            <h3 className="mb-5">{i18next.t(service.name)}</h3>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default Services;