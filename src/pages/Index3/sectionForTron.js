import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

class Section extends Component {
    
    render() {
        return (
            <React.Fragment>
                <section className="section bg-home height-80vh" id="home">
                    <div className="bg-overlay-tron"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container >
                                <Row >
                                    <Col lg={{size : 8, offset : 2}} className="text-white text-center">
                                        <div>
                                           <div>
                                                <h4 className="home-small-title" style={{paddingTop:"60px"}}>MultiSender</h4>
                                                <h1 className="home-title">We Support All Networks</h1>
                                                <p className="padding-t-15 home-desc mx-auto">
                                                    <span>MainNet</span>
                                                    
                                                    <span style={{paddingLeft:10}}>Shasta</span>
                                                    <span style={{paddingLeft:10}}>Tronex</span>
                                                    <span style={{paddingLeft:10}}>Nile</span>
                                                </p>
                                                <p className="play-shadow margin-t-30 margin-l-r-auto">
                                                </p> 
                                           </div>
                                        </div>
                                          
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Section;