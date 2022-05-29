import React, { Component } from 'react'
import i18next from 'i18next';

class Skills extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skills: [
                { name: "Python, Flask", progress: 95 },
                { name: "PHP, Codeigniter", progress: 90 },
                { name: "Javascript, React.js, Vue.js", progress: 90 },
                { name: "HTML5, CSS3", progress: 85 },
                { name: "SQL, MongoDB, InfluxDB", progress: 90 },
                { name: "C, C++, C#", progress: 70 },
                { name: "NLP, ML, DL, CV", progress: 95 },
                { name: "Bootstrap, Vuetify, Material UI", progress: 90 },
            ]
        }
    }

    render() {
        const { skills } = this.state;

        return (
            <section className="ftco-section" id="skills-section">
                <div className="container">
                    <div className="row justify-content-center pb-5">
                        <div className="col-md-12 heading-section text-center ">
                            <h1 className="big big-2">{i18next.t("my_skills")}</h1>
                            <h2 className="mb-4">{i18next.t("my_skills")}</h2>
                            <p>{i18next.t("my_skills_description")}</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            skills.map((skill, idx) => (
                                <div className="col-md-6 animate-box" key={idx}>
                                    <div className="progress-wrap ">
                                        <h3>{skill.name}</h3>
                                        <div className="progress">
                                            <div className="progress-bar color-1" role="progressbar" aria-valuenow={skill.progress}
                                                aria-valuemin="0" aria-valuemax="100" style={{ width: `${skill.progress}%` }}>
                                                <span>{skill.progress}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default Skills;