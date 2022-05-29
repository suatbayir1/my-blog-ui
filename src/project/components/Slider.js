// Libraries
import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// Components
import { EmptyState, ComponentSize, } from '@influxdata/clockface';

class Slider extends Component {
    render() {
        const { selectedProject } = this.props;

        if (Object.keys(selectedProject).length === 0) {
            return <></>;
        }

        return (
            <Carousel
                autoPlay={true}
                centerMode={false}
                emulateTouch={true}
                infiniteLoop={true}
                interval={3000}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
            >
                {selectedProject?.images?.length > 0 ?
                    selectedProject?.images.map((image, idx) =>
                        <div key={idx}>
                            <img
                                src={`${process.env.REACT_APP_IMAGES_URL}/${image}`}
                                style={{ minHeight: '700px', maxHeight: '700px' }}
                                alt={image}
                            />
                        </div>
                    )
                    :
                    <EmptyState size={ComponentSize.Large}>
                        <EmptyState.Text>
                            No <b>image</b> found matching your project.
                        </EmptyState.Text>
                    </EmptyState>
                }
            </Carousel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedProject: state.project.selectedProject
    };
};

export default connect(mapStateToProps, null)(Slider);