import React, { Component } from 'react'
import i18next from 'i18next';
import { connect } from "react-redux"

// Components
import {
    Page, Grid, ComponentSize, Table, ButtonType, Appearance,
    DapperScrollbars, BorderType, FlexBox, ConfirmationButton,
    ComponentColor, Panel, IconFont, Button, Columns,
} from '@influxdata/clockface'

// Actions
import { setCreateCategoryOverlay, fetchDeleteCategory } from "../../store/index";

class CategoryContainer extends Component {
    render() {
        const { allCategories } = this.props;

        return (
            <Page>
                <Page.Header fullWidth={false}>
                    <Page.Title title={i18next.t('categories')} />
                    {
                        this.optionsComponents
                    }
                </Page.Header>

                <Page.Contents fullWidth={false} scrollable={true}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column widthXS={Columns.Three}>
                                <Button
                                    color={ComponentColor.Primary}
                                    text={i18next.t('create_category')}
                                    size={ComponentSize.Medium}
                                    type={ButtonType.Submit}
                                    icon={IconFont.Plus}
                                    onClick={() => { this.props.setCreateCategoryOverlay(true) }}
                                />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widthXS={Columns.Twelve}>
                                <DapperScrollbars
                                    autoHide={false}
                                    autoSizeHeight={true}
                                    style={{ maxHeight: '600px' }}
                                    className="data-loading--scroll-content"
                                >
                                    <Panel>

                                        <Table
                                            borders={BorderType.Vertical}
                                            fontSize={ComponentSize.ExtraSmall}
                                            cellPadding={ComponentSize.ExtraSmall}
                                            id={"failureTable"}
                                        >
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell style={{ width: "30px" }}>ID</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "300px" }}>Category Name</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "200px" }}>Post Count</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "200px" }}>Created At</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "50px" }}></Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {
                                                    allCategories.map((category, idx) => (
                                                        <Table.Row key={idx}>
                                                            <Table.Cell>{category.category._id}</Table.Cell>
                                                            <Table.Cell>{category.category.categoryName}</Table.Cell>
                                                            <Table.Cell>{category.posts}</Table.Cell>
                                                            <Table.Cell>{new Date(category.category.createdAt).toLocaleString()}</Table.Cell>
                                                            <Table.Cell>
                                                                <FlexBox margin={ComponentSize.Medium}>
                                                                    <ConfirmationButton
                                                                        icon={IconFont.Remove}
                                                                        onConfirm={() => { this.props.fetchDeleteCategory(category.category._id) }}
                                                                        text={""}
                                                                        size={ComponentSize.ExtraSmall}
                                                                        popoverColor={ComponentColor.Danger}
                                                                        popoverAppearance={Appearance.Outline}
                                                                        color={ComponentColor.Danger}
                                                                        confirmationLabel="Do you want to delete ?"
                                                                        confirmationButtonColor={ComponentColor.Danger}
                                                                        confirmationButtonText="Yes"
                                                                    />
                                                                </FlexBox>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    ))
                                                }
                                            </Table.Body>
                                        </Table>
                                    </Panel>
                                </DapperScrollbars>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Page.Contents>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCategories: state.general.allCategories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCreateCategoryOverlay: (payload) => dispatch(setCreateCategoryOverlay(payload)),
        fetchDeleteCategory: (payload) => dispatch(fetchDeleteCategory(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);