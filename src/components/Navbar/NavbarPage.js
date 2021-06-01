import React, { Component } from 'react';
import { 
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Container,
    Collapse,
    Button
} from "reactstrap";
import ScrollspyNav from "./scrollSpy";

//Import Stickey Header
import StickyHeader from 'react-sticky-header';
import '../../../node_modules/react-sticky-header/styles.css';
import Modal from "./ModalSection";
import ConnectWallet from "./connectWallet";

class Navbar_Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            navItems : [
                { id: 1 , idnm : "home", navheading: "Home" },
                { id: 2 , idnm : "features", navheading: "MultiSendBNB" },
                { id: 3 , idnm : "features", navheading: "MultiSendBEP20" },
                ],
            isOpenMenu :false
        };

      
    }


    toggle = () => {
        this.setState({ isOpenMenu: !this.state.isOpenMenu });
    }

    truncate(str) {
        return str.length > 10  ? str.substring(0,6) + "..." + str.substring(38,42): str;
    }
    
    render() {
        //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
        let TargetId = this.state.navItems.map((item) => {
            return(
                item.idnm
            )
        });

        return (
            <React.Fragment>
                <StickyHeader
                    
                    header = {
                        <Navbar expand="lg" fixed="top" className={ this.props.navClass + " navbar-custom sticky sticky-dark"}>
                            <Container>
                                <NavbarBrand className="logo" href="/">
                                    <i class="mdi mdi-alien"></i>Shree
                                </NavbarBrand>
        
                                <NavbarToggler className="p-0" onClick={this.toggle} ><i className="mdi mdi-menu"></i></NavbarToggler>
        
                                <Collapse id="navbarCollapse" isOpen={this.state.isOpenMenu} navbar>
                                    <ScrollspyNav
                                        scrollTargetIds={TargetId}
                                        activeNavClass="active"
                                        scrollDuration="800"
                                        headerBackground="true"
                                    >
                                        <Nav className="navbar-nav navbar-center" id="mySidenav">
                                            {this.state.navItems.map((item) => (
                                                <NavItem className={item.navheading === "Home" ? "active" : "" }>
                                                    <NavLink href={"#" + item.idnm} > {item.navheading}</NavLink>
                                                </NavItem>
                                            ))} 
                                        </Nav>
                                        </ScrollspyNav>
                                        
                                        <div className="nav-button ml-auto">
                                            <Nav className="navbar-right" navbar>
                                                <NavItem>
                                                    <Modal  Contract = {this.props.multiSender} account = {this.props.account} walletConnected={this.props.walletConnected} />
                                                </NavItem>

                                                <NavItem className={"active"}>
                                                    
                                                    {
                                                        this.props.walletConnected
                                                        ? (<NavLink>{this.truncate(this.props.account)}
                                                            
                                                            </NavLink>)
                                                        : (<p></p>)
                                                    }
                                                    
                                                </NavItem>
                                                <NavItem>
                                                    
                                                      {this.props.walletConnected
                                                        ? <Button type="button" className="btn-custom navbar-btn btn-rounded waves-effect waves-light" onClick={this.props.handleConnectWallet}>Change Wallet</Button>

                                                        : <Button type="button" className="btn-custom navbar-btn btn-rounded waves-effect waves-light" onClick={this.props.handleConnectWallet}>Connect Wallet</Button>
                                                      }                                                 
                                                    
                                                </NavItem>
                                                
                                            </Nav>
                                        </div>
                                    
                                </Collapse>
                            </Container>
                        </Navbar>
                    }
                    stickyOffset = {-100}
                >
                </StickyHeader>
            </React.Fragment>
        );
    }
}

export default Navbar_Page;