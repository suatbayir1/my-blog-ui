import React, { Component } from 'react'
import i18next from 'i18next';
import { connect } from "react-redux"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { NotificationManager } from 'react-notifications';
import draftToHtml from 'draftjs-to-html';
import { v4 as uuidv4 } from "uuid";

// Components
import {
    Page, Grid, DapperScrollbars, Form, Input, SelectDropdown,
    ComponentColor, Panel, IconFont, Button, Columns, MultiSelectDropdown,
} from '@influxdata/clockface'
import DragAndDrop from '../../shared/components/DragAndDrop';

// Actions
import { fetchGetAllPosts, fetchCreatePost, fetchGetSinglePost } from "../../store/index";

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            category: "",
            keywords: [],
            abstract: "",
            file: null,
            editorState: EditorState.createEmpty(),
        }
    }

    async componentDidMount() {
        this.checkUpdateForm();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.type !== this.props.match.params.type) {
            this.checkUpdateForm();
        }

        if (prevProps.match.params.type !== "create" && prevProps.selectedPost !== this.props.selectedPost) {
            console.log();
            this.setState({
                title: this.props.selectedPost.title,
                category: this.props.selectedPost.category,
                keywords: this.props.selectedPost.keywords,
                abstract: this.props.selectedPost.abstract,
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(this.props.selectedPost.content)
                    )
                ),
            })
        }
    }

    checkUpdateForm = async () => {
        if (this.props.match.params.type === "create") {
            return;
        }

        await this.props.fetchGetSinglePost(this.props.match.params.type);
    }

    handleChangeKeywords = (option) => {
        const { keywords } = this.state
        const optionExists = keywords.find(opt => opt === option)
        let updatedOptions = keywords

        if (optionExists) {
            updatedOptions = keywords.filter(fo => fo !== option)
        } else {
            updatedOptions = [...keywords, option]
        }

        this.setState({ keywords: updatedOptions })
    }

    setFile = (file) => {
        this.setState({ file });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    create = () => {
        const { title, category, keywords, abstract, file, editorState } = this.state;

        if (title.trim() === "" || category.trim() === "" || abstract.trim() === "" || keywords.length === 0) {
            NotificationManager.error(i18next.t('empty_form'), i18next.t('warning'), 3000);
            return;
        }

        const fileExtension = file?.name.split('.').pop();
        const fileNameWithExtension = `${uuidv4()}.${fileExtension}`;

        const formData = new FormData();
        var blob = file.slice(0, file.size, file.type);
        console.log(blob);
        let newFile = new File([blob], fileNameWithExtension, { type: file.type });
        formData.append("file", newFile);

        console.log(newFile);

        const payload = {
            title,
            category,
            keywords,
            abstract,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            imageUrl: fileNameWithExtension
        }

        this.props.fetchCreatePost(payload, formData);
    }

    render() {
        const { title, category, keywords, abstract, editorState } = this.state;
        const { allCategories } = this.props;

        const categories = allCategories.map(category => category.category.categoryName);

        return (
            <Page>
                <Page.Header fullWidth={false}>
                    <Page.Title title={i18next.t('create_post')} />
                </Page.Header>

                <Page.Contents fullWidth={false} scrollable={true}>
                    <Panel>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column widthXS={Columns.Four}>
                                    <Form.Element
                                        label="Title"
                                        required={true}
                                    >
                                        <Input
                                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                                            autoFocus={true}
                                            value={title}
                                        />
                                    </Form.Element>
                                </Grid.Column>
                                <Grid.Column widthXS={Columns.Two}>
                                    <Form.Element
                                        label="Category"
                                        required={true}
                                    >
                                        <SelectDropdown
                                            options={categories}
                                            selectedOption={category}
                                            onSelect={(e) => { this.setState({ category: e }) }}
                                        />
                                    </Form.Element>
                                </Grid.Column>
                                <Grid.Column widthXS={Columns.Two}>
                                    <Form.Element
                                        label="Keywords"
                                        required={true}
                                    >
                                        <MultiSelectDropdown
                                            options={categories}
                                            selectedOptions={keywords}
                                            onSelect={this.handleChangeKeywords}
                                        />
                                    </Form.Element>
                                </Grid.Column>
                                <Grid.Column widthXS={Columns.Four}>
                                    <Form.Element
                                        label="Abstract"
                                        required={true}
                                    >
                                        <Input
                                            onChange={(e) => { this.setState({ abstract: e.target.value }) }}
                                            value={abstract}
                                        />
                                    </Form.Element>
                                </Grid.Column>
                                <Grid.Column widthXS={Columns.Twelve}>
                                    <DragAndDrop
                                        setFile={this.setFile}
                                    />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row style={{ marginTop: '20px' }}>
                                <Grid.Column widthXS={Columns.Twelve}>
                                    <DapperScrollbars
                                        autoHide={false}
                                        autoSizeHeight={true}
                                        style={{ maxHeight: '400px' }}
                                        className="data-loading--scroll-content"
                                    >

                                        <div style={{ backgroundColor: 'white', color: 'black' }}>
                                            <Editor
                                                editorState={editorState}
                                                wrapperClassName="demo-wrapper"
                                                editorClassName="demo-editor"
                                                onEditorStateChange={this.onEditorStateChange}
                                            />
                                        </div>
                                    </DapperScrollbars>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Form.Footer>
                            <Button
                                text={`Create Post`}
                                icon={IconFont.Import}
                                color={ComponentColor.Primary}
                                onClick={this.create}
                            />
                        </Form.Footer>
                    </Panel>
                </Page.Contents>
            </Page >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allCategories: state.general.allCategories,
        selectedPost: state.post.selectedPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetAllPosts: () => dispatch(fetchGetAllPosts()),
        fetchCreatePost: (payload, formData) => dispatch(fetchCreatePost(payload, formData)),
        fetchGetSinglePost: (id) => dispatch(fetchGetSinglePost(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);