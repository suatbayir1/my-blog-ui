import React, { Component } from 'react'
import i18next from 'i18next';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';

// Actions
import { fetchGetCategories, setAllPostsOverlay } from "../../store/general/generalActions";

class Footer extends Component {
    componentDidMount() {
        this.props.fetchGetCategories(5);
    }

    render() {
        const { categories } = this.props;

        return (
            <footer className="ftco-footer ftco-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">{i18next.t('about_me')}</h2>
                                <p>{i18next.t('site_info')}</p>
                                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li className=""><a target="_blank" href="https://twitter.com/"><span className="icon-twitter"></span></a></li>
                                    <li className=""><a target="_blank" href="https://github.com/suatbayir1"><span className="icon-github"></span></a></li>
                                    <li className=""><a target="_blank" href="https://www.instagram.com/suatbayir_/"><span className="icon-instagram"></span></a></li>
                                    <li className=""><a target="_blank" href="https://www.linkedin.com/in/suatbayir/"><span className="icon-linkedin"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Blog</h2>
                                <ul className="list-unstyled">
                                    {
                                        categories.map((category, idx) =>
                                            <li key={idx}>
                                                <Link
                                                    to={`/#blog-section?category=${category.category.categoryName}`}
                                                    style={{ fontWeight: 400 }}
                                                    onClick={() => {
                                                        this.props.setAllPostsOverlay(true);
                                                    }}
                                                    query={{ test: 'test-category' }}
                                                >
                                                    <span className="icon-long-arrow-right mr-2"></span>{category.category.categoryName}
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">{i18next.t('contact')}</h2>
                                <div className="block-23 mb-3">
                                    <ul>
                                        <li><span className="icon icon-map-marker"></span><span className="text">İskenderun, Hatay</span></li>
                                        <li><a href="#"><span className="icon icon-phone"></span><span className="text">0543 372 37 69</span></a></li>
                                        <li><a href="#"><span className="icon icon-envelope"></span><span className="text">suatbayir1@gmail.com</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <p>Copyright &copy; 2022 {i18next.t('all_rights_reserved')} | <a href='https://www.linkedin.com/in/suatbayir/' target="_blank">Suat Bayır</a> {i18next.t('has_prepared')}</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.general.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetCategories: (payload) => dispatch(fetchGetCategories(payload)),
        setAllPostsOverlay: (payload) => dispatch(setAllPostsOverlay(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);