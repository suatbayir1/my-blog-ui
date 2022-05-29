import React, { Component } from 'react'
import i18next from 'i18next';
import { connect } from "react-redux"

class Counter extends Component {
    render() {
        const { allProjects, allPosts } = this.props;

        return (
            <section className="ftco-section ftco-no-pt ftco-no-pb ftco-counter img" id="section-counter">
                <div className="container">
                    <div className="row d-md-flex align-items-center">
                        <div className="col-md d-flex justify-content-center counter-wrap ">
                            <div className="block-18">
                                <div className="text">
                                    <strong className="number" data-number="100">6</strong>
                                    <span>{i18next.t('award')} &amp; {i18next.t('certificates')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md d-flex justify-content-center counter-wrap ">
                            <div className="block-18">
                                <div className="text">
                                    <strong className="number" data-number="1200">{allProjects.length}</strong>
                                    <span>{i18next.t('completed_project')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md d-flex justify-content-center counter-wrap ">
                            <div className="block-18">
                                <div className="text">
                                    <strong className="number" data-number="1200">2</strong>
                                    <span>{i18next.t('happy_customer')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md d-flex justify-content-center counter-wrap ">
                            <div className="block-18">
                                <div className="text">
                                    <strong className="number" data-number="500">{allPosts.length}</strong>
                                    <span>{i18next.t('post_count')}</span>
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
        allProjects: state.project.allProjects,
        allPosts: state.post.allPosts
    };
};

export default connect(mapStateToProps, null)(Counter);