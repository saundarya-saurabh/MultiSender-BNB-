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
import ModalForTron from "./ModalSectionForTron";

class Navbar_Page extends Component {
    constructor(props){
        super(props);
        this.state = {
            navItems : [
                { id: 1 , idnm : "home", navheading: "Home" },
                { id: 2 , idnm : "features", navheading: "MultiSendTRX" },
                // { id: 3 , idnm : "services", navheading: "MultiSendTrx" },
                ],
            isOpenMenu :false
        };

      
    }


    toggle = () => {
        this.setState({ isOpenMenu: !this.state.isOpenMenu });
    }

    truncate(str) {
        return str.length > 10  ? str.substring(0,6) + "..." + str.substring(30,34): str;
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
                                    <i class="mdi mdi-alien"></i>Payzus
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
                                        {/* <Nav className="navbar-left" navbar>
                                            <NavItem>
                                                <NavLink href={"/ethereum"}>MultiSendEther</NavLink>
                                            </NavItem>
                                        </Nav> */}
                                        <div className="nav-button ml-auto">
                                            <Nav className="navbar-right" navbar>
                                                {/* <NavItem>
                                                    <ModalForTron  address={this.props.address} walletConnected={this.props.walletConnected} multisender={this.props.multisender}/>
                                                </NavItem> */}

                                                <NavItem className={"active"}>
                                                    
                                                    {
                                                        this.props.walletConnected
                                                        ? 
                                                            (<NavLink>{this.truncate(this.props.address)}</NavLink>)
                                                            
                                                        : (<p></p>)
                                                    }
                                                    
                                                </NavItem>
                                                <NavItem>
                                                    
                                                      {this.props.walletConnected
                                                        ? <Button type="button" className="btn-custom navbar-btn btn-rounded waves-effect waves-light" onClick={this.props.connectTronWallet}>Change Wallet</Button>

                                                        : <Button type="button" className="btn-custom navbar-btn btn-rounded waves-effect waves-light" onClick={this.props.connectTronWallet}>Connect Wallet</Button>
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