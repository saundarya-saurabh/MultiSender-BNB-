import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row,Col } from "reactstrap";

//Import Section Title
import SectionTitle from "../common/section-title";

class Services extends Component {
   
    render() {
        return (
            <React.Fragment>
                <SectionTitle title="MultiSend Tron" description="Description Here"/>
                <section className="section bg-light" id="services" style={{marginTop:20}}>
                <div className="bg-overlay"></div>
                    <Container>
                        <Row>
            
                            <Col lg={{size :8, offset:2}} className="text-center">
                                <h1>{this.props.address}</h1>
                                <h1 className="get-started-title text-white">Send Trx</h1>
                                <div className="section-title-border margin-t-20 bg-white"></div>
                                <p className="section-subtitle font-secondary text-white text-center padding-t-30">Send Trx and TRC20 Tokens to multiple accounts </p>
                                <Link to="#" className="btn btn-bg-white waves-effect margin-t-20">Comming Soon </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Services;