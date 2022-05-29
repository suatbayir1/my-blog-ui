// Libraries
import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import i18next from 'i18next';

// Components
import {
    Overlay, Form, Grid, Button, ComponentColor, Input,
    ButtonType, ComponentStatus, IconFont, Columns,
} from '@influxdata/clockface';

// Actions
import { setCreateCategoryOverlay, fetchCreateCategory, fetchGetAllCategories } from "../../store/index";


class CreateCategoryOverlay extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            categoryName: "",
        }
    }

    async componentDidMount() {
        this.props.fetchGetAllCategories();
    }

    create = async () => {
        const { categoryName } = this.state;

        const payload = { categoryName };

        await this.props.fetchCreateCategory(payload);
    }

    render() {
        const { categoryName } = this.state;
        const { visible } = this.props;

        return (
            <Overlay visible={visible}>
                <Overlay.Container maxWidth={500}>
                    <Form onSubmit={this.submit}>
                        <Overlay.Header
                            title={i18next.t('create_category')}
                            onDismiss={() => { this.props.setCreateCategoryOverlay(false) }}
                        />
                        <Overlay.Body>
                            <Grid.Row>
                                <Grid.Column widthXS={Columns.Twelve}>
                                    <Form.Element
                                        label={i18next.t('category')}
                                        required={true}
                                    >
                                        <Input
                                            onChange={(e) => { this.setState({ categoryName: e.target.value }) }}
                                            value={categoryName}
                                        />
                                    </Form.Element>
                                </Grid.Column>
                            </Grid.Row>
                        </Overlay.Body>
                        <Overlay.Footer>
                            <Button
                                text={i18next.t('close_window')}
                                icon={IconFont.Remove}
                                color={ComponentColor.Default}
                                status={ComponentStatus.Default}
                                type={ButtonType.Submit}
                                onClick={() => { this.props.setCreateCategoryOverlay(false) }}
                            />
                            <Button
                                text={i18next.t('create_category')}
                                icon={IconFont.Checkmark}
                                color={ComponentColor.Primary}
                                status={ComponentStatus.Default}
                                type={ButtonType.Submit}
                                onClick={this.create}
                            />
                        </Overlay.Footer>
                    </Form>
                </Overlay.Container>
            </Overlay>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.general.visibleCreateCategoryOverlay,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCreateCategoryOverlay: (payload) => dispatch(setCreateCategoryOverlay(payload)),
        fetchCreateCategory: (payload) => dispatch(fetchCreateCategory(payload)),
        fetchGetAllCategories: (payload) => dispatch(fetchGetAllCategories(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryOverlay);