import React, { Component } from 'react'
import RightSideBar from "./RightSideBar";
import Content from "./Content";


class BlogDetail extends Component {
    render() {
        return (
            <section className="ftco-section" id="blog-detail-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ">
                            <Content />
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

export default BlogDetail;