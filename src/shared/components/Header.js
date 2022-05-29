import React, { Component } from 'react'
import $ from "jquery"
import { HashLink as Link } from 'react-router-hash-link';
import i18next from 'i18next';

// Components
import {
    Dropdown, ComponentSize, Button, ComponentColor,
} from '@influxdata/clockface';


class Header extends Component {
    componentDidMount() {
        // scroll
        var scrollWindow = function () {
            $(window).scroll(function () {
                var $w = $(this),
                    st = $w.scrollTop(),
                    navbar = $('.ftco_navbar'),
                    sd = $('.js-scroll-wrap');

                if (st > 150) {
                    if (!navbar.hasClass('scrolled')) {
                        navbar.add('scrolled');
                    }
                }
                if (st < 150) {
                    if (navbar.hasClass('scrolled')) {
                        navbar.removeclassName('scrolled sleep');
                    }
                }
                if (st > 350) {
                    if (!navbar.hasClass('awake')) {
                        navbar.addClass('awake');
                    }

                    if (sd.length > 0) {
                        sd.addClass('sleep');
                    }
                }
                if (st < 350) {
                    if (navbar.hasClass('awake')) {
                        navbar.removeclassName('awake');
                        navbar.addClass('sleep');
                    }
                    if (sd.length > 0) {
                        sd.removeclassName('sleep');
                    }
                }
            });
        };
        scrollWindow();

    }

    change = (option) => {
        localStorage.setItem('lang', option);
        window.location.reload();
    }

    render() {
        const lang = localStorage.getItem('lang') || 'en';
        const links = [
            { href: "#home-section", name: i18next.t('homepage') },
            { href: "#about-section", name: i18next.t('about_me') },
            { href: "#resume-section", name: i18next.t('resume') },
            { href: "#projects-section", name: i18next.t('projects') },
            { href: "#blog-section", name: i18next.t('blog') },
            { href: "#contact-section", name: i18next.t('contact') },
        ]

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light site-navbar-target" id="ftco-navbar">
                    <div className="container">
                        <Link to={"/#home-section"} className="navbar-brand">
                            Suat Bayır
                        </Link>
                        <button className="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="oi oi-menu" style={{ color: '#fff' }}></span> <span style={{ color: '#fff' }}>Menu</span>
                        </button>

                        <div className="collapse navbar-collapse" id="ftco-nav">
                            <ul className="navbar-nav nav ml-auto">
                                {
                                    links.map((link, idx) => (
                                        <li className="nav-item" key={idx}><a href={link.href} className="nav-link"><span>{link.name}</span></a></li>
                                    ))
                                }
                                <li className="nav-item">
                                    <Link to={"/sign-in"}>
                                        <Button
                                            color={ComponentColor.Primary}
                                            text={i18next.t('login')}
                                            size={ComponentSize.Medium}
                                        />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Dropdown
                                        button={(active, onClick) => (
                                            <Dropdown.Button
                                                onClick={onClick}
                                                active={active}
                                                style={{ width: '100px' }}
                                                size={ComponentSize.Medium}
                                            >
                                                {
                                                    lang === "tr" ?
                                                        <img src="/images/turkish-flag.png" width={50} height={50} />
                                                        :
                                                        <img src="/images/us-flag.png" width={50} height={50} />
                                                }

                                            </Dropdown.Button>
                                        )}
                                        menu={onCollapse => (
                                            <Dropdown.Menu onCollapse={onCollapse}>
                                                <Dropdown.Item
                                                    key={"tr"}
                                                    value={"tr"}
                                                    onClick={(e) => { this.change(e) }}
                                                    selected={"tr" === lang}
                                                >
                                                    <img src="/images/turkish-flag.png" width={70} height={70} />
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    key={"en"}
                                                    value={"en"}
                                                    onClick={(e) => { this.change(e) }}
                                                    selected={"en" === lang}
                                                >
                                                    <img src="/images/us-flag.png" width={70} height={70} />
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        )}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default Header;