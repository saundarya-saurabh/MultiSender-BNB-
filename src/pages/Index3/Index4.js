import React, { Component } from 'react';
import NavbarPage from "../../components/Navbar/NavbarPageForTron";
import Section from "./sectionForTron";
import Features from '../../components/Features/featureForTron';
import Footer from '../../components/Footer/footer';
import Services from "../../components/Services/services";


class Tron extends Component {
    constructor(props) {
        super(props);
        this.state = {
          navClass : "",
        };
    }
        componentDidMount = async() =>
    {
        document.getElementById("colorTheme").href="assets/colors/blue.css";
        // console.log(this.props.account)
        
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPage 
                    navClass = {this.state.navClass} 
                    connectTronWallet = {this.props.connectTronWallet}
                    walletConnected = {this.props.walletConnected}
                    address = {this.props.address}
                    multisender = {this.props.MultiSenderContract}
                    />

                {/* Importing Section */}
                <Section/>

                {/* Importing Features */}
                <Features multisender = {this.props.MultiSenderContract} address={this.props.address}/>

                {/* Importing Get Footer */}

               

                <Footer/>

            </React.Fragment>
        );
    }
}

export default Tron;