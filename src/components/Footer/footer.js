import React, { Component } from 'react';

//Import Footer link
import FooterLinks from "./footer-links";

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <FooterLinks/>
            </React.Fragment>
        );
    }
}

export default Footer;