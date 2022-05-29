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
import { fetchGetAllPosts, fetchDeletePost } from "../../store/index";
import { Link } from 'react-router-dom';

class PostsContainer extends Component {
    componentDidMount() {
        this.props.fetchGetAllPosts();
    }

    render() {
        const { allPosts } = this.props;

        console.log(allPosts);

        return (
            <Page>
                <Page.Header fullWidth={false}>
                    <Page.Title title={i18next.t('posts')} />
                    {
                        this.optionsComponents
                    }
                </Page.Header>

                <Page.Contents fullWidth={false} scrollable={true}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column widthXS={Columns.Three}>
                                <Link to="/admin/post/create">
                                    <Button
                                        color={ComponentColor.Primary}
                                        text={i18next.t('create_post')}
                                        size={ComponentSize.Medium}
                                        type={ButtonType.Submit}
                                        icon={IconFont.Plus}
                                    />
                                </Link>
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
                                                    <Table.HeaderCell style={{ width: "300px" }}>Title</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "200px" }}>Category</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "200px" }}>Keywords</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "200px" }}>Created At</Table.HeaderCell>
                                                    <Table.HeaderCell style={{ width: "50px" }}></Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {
                                                    allPosts.map((post, idx) => (
                                                        <Table.Row key={idx}>
                                                            <Table.Cell>{post._id}</Table.Cell>
                                                            <Table.Cell>{post.title}</Table.Cell>
                                                            <Table.Cell>{post.category}</Table.Cell>
                                                            <Table.Cell>{post.keywords.join(", ")}</Table.Cell>
                                                            <Table.Cell>{new Date(post.createdAt).toLocaleString()}</Table.Cell>
                                                            <Table.Cell>
                                                                <FlexBox margin={ComponentSize.Medium}>
                                                                    <Link to={`/admin/post/${post._id}`}>
                                                                        <Button
                                                                            size={ComponentSize.ExtraSmall}
                                                                            icon={IconFont.Pencil}
                                                                            color={ComponentColor.Primary}
                                                                            type={ButtonType.Submit}
                                                                        />
                                                                    </Link>
                                                                    <ConfirmationButton
                                                                        icon={IconFont.Remove}
                                                                        onConfirm={() => { this.props.fetchDeletePost(post._id) }}
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
        allPosts: state.post.allPosts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetAllPosts: () => dispatch(fetchGetAllPosts()),
        fetchDeletePost: (id) => dispatch(fetchDeletePost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);