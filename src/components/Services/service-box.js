import React, { Component } from 'react';
import { Col, Media } from "reactstrap";

class ServiceBox extends Component {

    render() {
        return (
            <React.Fragment>
                            <Col lg="4" className="margin-t-20">
                                <div className="services-box">
                                    <Media>
                                        <i className={this.props.icon + " text-custom"}></i>
                                        <Media className="ml-4" body>
                                            <h4>{this.props.title}</h4>
                                            <p className="pt-2 text-muted">{this.props.description}</p>
                                        </Media>
                                    </Media>
                                </div>
                            </Col>
            </React.Fragment>
        );
    }
}

export default ServiceBox;