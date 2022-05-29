import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from "react-redux"

// Actions
import { setAllPostsOverlay, } from "../../store/index";
import i18next from 'i18next';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [
                { id: 1, name: "Python", postCount: "15" },
                { id: 2, name: "Derin Öğrenme", postCount: "7" },
                { id: 3, name: "Makine Öğrenmesi", postCount: "2" },
                { id: 4, name: "Nodejs", postCount: "3" },
                { id: 5, name: "MongoDB", postCount: "1" },
            ],
        }
    }

    render() {
        const { categories } = this.props;

        return (
            <React.Fragment>
                <div className="sidebar-box ">
                    <h3 className="heading-sidebar" style={{ marginTop: 12 }}>{i18next.t('categories')}</h3>
                    <ul className="categories">
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
                                        {category.category.categoryName} <span>({category.posts})</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </React.Fragment>
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
        setAllPostsOverlay: (payload) => dispatch(setAllPostsOverlay(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);