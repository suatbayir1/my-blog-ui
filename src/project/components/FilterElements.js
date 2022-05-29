// Libraries
import React, { Component } from 'react'
import i18next from 'i18next';

// Components
import {
    Grid, Dropdown, Input, IconFont, Columns,
    FormElement, SelectDropdown,
} from '@influxdata/clockface';
import { connect } from 'react-redux';

class FilterElements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchName: "",
            sortType: { key: "name-a-to-z", label: `${i18next.t('name')} (A → Z)` },
            sortTypes: [
                { key: "name-a-to-z", label: `${i18next.t('name')} (A → Z)` },
                { key: "name-z-to-a", label: `${i18next.t('name')} (Z → A)` },
                { key: "created-oldest", label: `${i18next.t('created')} (${i18next.t('oldest')})` },
                { key: "created-newest", label: `${i18next.t('created')} (${i18next.t('newest')})` },
            ],
            keyword: "All",
        }
    }

    getKeywords = () => {
        const categories = this.props.allCategories.map(category => category.category.categoryName);

        return ["All", ...categories];
    }

    render() {
        const { searchName, sortType, sortTypes, keyword } = this.state;
        const { filterProjects } = this.props;

        return (
            <>
                <Grid.Column widthSM={Columns.Three}>
                    <FormElement label={i18next.t('filter_by_name')}>
                        <Input
                            icon={IconFont.Search}
                            value={searchName}
                            onChange={(e) => {
                                this.setState({ searchName: e.target.value },
                                    () => filterProjects(this.state.searchName, this.state.sortType, this.state.keyword))
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
                                                    () => filterProjects(this.state.searchName, this.state.sortType, this.state.keyword))
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
                    <FormElement label={i18next.t('filter_by_keyword')}>
                        <SelectDropdown
                            options={this.getKeywords()}
                            selectedOption={keyword}
                            onSelect={(e) => {
                                this.setState({ keyword: e },
                                    () => filterProjects(this.state.searchName, this.state.sortType, this.state.keyword))
                            }}
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