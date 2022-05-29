// Libraries
import React, { Component } from 'react'
import i18next from 'i18next';
import { connect } from 'react-redux';

// Components
import {
    Grid, Dropdown,
    Input, IconFont, Columns,
    FormElement,
} from '@influxdata/clockface';

class FilterElements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTitle: "",
            sortType: { key: "name-a-to-z", label: `${i18next.t('name')} (A → Z)` },
            sortTypes: [
                { key: "name-a-to-z", label: `${i18next.t('name')} (A → Z)` },
                { key: "name-z-to-a", label: `${i18next.t('name')} (Z → A)` },
                { key: "created-oldest", label: `${i18next.t('created')} (${i18next.t('oldest')})` },
                { key: "created-newest", label: `${i18next.t('created')} (${i18next.t('newest')})` },
                { key: "most-commented", label: i18next.t('most_commented') },
                { key: "less-commented", label: i18next.t('less_commented') },
            ],
            categories: [
                { key: "all", label: "All" },
                { key: "python", label: "Python" },
                { key: "nodejs", label: "Nodejs" },
                { key: "react", label: "React" },
                { key: "datamining", label: "Data Mining" },
                { key: "php", label: "PHP" },
            ],
            category: { key: "all", label: "All" },
        }
    }

    getKeywords = () => {
        const categories = this.props.allCategories.map(category => {
            return { key: category.category._id, label: category.category.categoryName }
        });

        console.log(categories);

        return [{ key: "all", label: "All" }, ...categories];
    }

    render() {
        const { searchTitle, sortType, sortTypes, category } = this.state;
        const { filterPosts } = this.props;

        return (
            <>
                <Grid.Column widthSM={Columns.Three}>
                    <FormElement label={i18next.t('filter_by_title')}>
                        <Input
                            icon={IconFont.Search}
                            value={searchTitle}
                            onChange={(e) => {
                                this.setState({ searchTitle: e.target.value },
                                    () => filterPosts(this.state.searchTitle, this.state.sortType, this.state.category))
                            }}
                        />
                    </FormElement>
                </Grid.Column>

                <Grid.Column widthSM={Columns.Three}>
                    <FormElement label={i18next.t('sort_by_option')}>
                        <Dropdown
                            button={(active, onClick) => (
                                <Dropdown.Button
                                    onClick={onClick}
                                    active={active}
                                >
                                    {sortType.label}
                                </Dropdown.Button>
                            )}
                            menu={onCollapse => (
                                <Dropdown.Menu onCollapse={onCollapse}>
                                    {sortTypes.map(item => (
                                        <Dropdown.Item
                                            key={item.key}
                                            value={item}
                                            onClick={(e) => {
                                                this.setState({ sortType: e },
                                                    () => filterPosts(this.state.searchTitle, this.state.sortType, this.state.category))
                                            }}
                                            selected={item.key === sortType.key}
                                        >
                                            {item.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            )}
                        />
                    </FormElement>
                </Grid.Column>

                <Grid.Column widthSM={Columns.Three}>
                    <FormElement label={i18next.t('filter_by_category')}>
                        <Dropdown
                            button={(active, onClick) => (
                                <Dropdown.Button
                                    onClick={onClick}
                                    active={active}
                                >
                                    {category.label}
                                </Dropdown.Button>
                            )}
                            menu={onCollapse => (
                                <Dropdown.Menu onCollapse={onCollapse}>
                                    {this.getKeywords().map(item => (
                                        <Dropdown.Item
                                            key={item.key}
                                            value={item}
                                            onClick={(e) => {
                                                this.setState({ category: e },
                                                    () => filterPosts(this.state.searchTitle, this.state.sortType, this.state.category))
                                            }}
                                            selected={item.key === category.key}
                                        >
                                            {item.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            )}
                        />
                    </FormElement>
                </Grid.Column>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCategories: state.general.allCategories
    }
}

export default connect(mapStateToProps, null)(FilterElements);