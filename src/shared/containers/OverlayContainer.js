// Libraries
import React, { Component } from 'react'

// Components
import AllProjectsOverlay from "../overlays/AllProjectsOverlay";
import AllPostsOverlay from '../overlays/AllPostsOverlay';
import CreateCategoryOverlay from '../../admin/overlays/CreateCategoryOverlay';

class OverlayContainer extends Component {
    render() {
        return (
            <>
                <AllProjectsOverlay />
                <AllPostsOverlay />
                <CreateCategoryOverlay />
            </>
        )
    }
}

export default OverlayContainer;