import React, { Component } from 'react';
import NavbarPage from "../../components/Navbar/NavbarPage";
import Section from "./section";
import Features from '../../components/Features/features';
import Footer from '../../components/Footer/footer';
import Services from "../../components/Services/services";


class Index3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          navClass : "",
        };
    }
        componentDidMount = async() =>
    {
        document.getElementById("colorTheme").href="assets/colors/blue.css";
        console.log(this.props.account)
        
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPage 
                    navClass = {this.state.navClass} 
                    account = {this.props.account} 
                    walletConnected = {this.props.walletConnected}
                    handleConnectWallet = {this.props.handleConnectWallet}
                    multiSender = {this.props.multiSender}
                    connectTronWallet = {this.props.connectTronWallet}
                    tronLoggedIn = {this.props.tronLoggedIn}
                    
                    />

                {/* Importing Section */}
                <Section/>

                {/* Importing Features */}
                <Features multiSender = {this.props.multiSender} account={this.props.account} web3={this.props.web3}/>

                {/* Importing Get Footer */}

                {/* <Services 
                    address = {this.props.address}
                /> */}

                <Footer/>

            </React.Fragment>
        );
    }
}

export default Index3;