// Libraries
import React, { Component } from 'react'

// Components
import RightSideBar from "./RightSideBar";
import Slider from "./Slider";

class ProjectDetail extends Component {
    render() {
        return (
            <section className="ftco-section" id="blog-detail-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ">
                            <Slider />
                        </div>

                        <div className="col-lg-4 sidebar ">
                            <RightSideBar />
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}

export default ProjectDetail;