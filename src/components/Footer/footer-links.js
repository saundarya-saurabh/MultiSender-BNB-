import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class FooterLinks extends Component {
    state = {
        socials : [
            { icon : "mdi mdi-facebook", link : "#" },
            { icon : "mdi mdi-twitter", link : "#" },
            { icon : "mdi mdi-linkedin", link : "#" },
            // { icon : "mdi mdi-google-plus", link : "#" },
            // { icon : "mdi mdi-dribbble", link : "#" },
        ]
    }
    render() {
        return (
            <React.Fragment>
                <div className="footer-alt" >
                    <Container>
                        <Row>
                            <Col lg="12">
                                <div className="float-left pull-none">
                                    <p className="copy-rights text-muted mb-3 mb-sm-0">2020 - 2021 © SHREE</p>
                                </div>
                                <div className="float-right pull-none ">
                                    <ul className="list-inline social m-0">
                                        {
                                            this.state.socials.map((social) =>
                                                <li className="list-inline-item"><Link to={social.link} class="social-icon"><i class={social.icon}></i></Link></li>
                                            )
                                        }
                                    </ul>
                                </div>
                                <div className="clearfix"></div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default FooterLinks;