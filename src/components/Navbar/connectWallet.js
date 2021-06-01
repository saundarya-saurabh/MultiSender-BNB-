import React, { useState, Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import swal from "sweetalert";
import generateElement from "../../generateElement";
import web3 from "web3";
import payzusABI from "../../contracts/PayzusABI.json";
import firebaseApp from "../../firebase-config";

const database = firebaseApp.database().ref("MultiSender");

class ConnectWallet extends Component {
  constructor(props){
      super(props);
      this.state = {
          modal:false,
          nestedModal:false,
          closeAll:false,
          
      }
  }

    toggle = () => this.setState({modal: !this.state.modal});

    toggleNested = () => {
        this.setState({nestedModal: !this.state.nestedModal, closeAll:false})
    } 

    toggleAll = () => {
        this.setState({nestedModal: !this.state.nestedModal, closeAll:true})
    }


  render() {

    return (
        <div>
           
            <Button color="danger" onClick={this.toggle} style={{marginLeft:"10px"}}>Connect Wallet</Button>
               
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} style={{top:"20%"}}>
            <ModalHeader toggle={this.toggle}>Select Your Wallet</ModalHeader>
            <ModalBody>                
              
              <br />
              <Button color="primary" onClick={this.toggleNested}>Why VIP ?</Button>
              <Button color="primary" style={{float:"right",marginLeft:"10px"}}
                onClick = { () => {
                    this.props.hello()
                }}
                >
                    MetaMask
                </Button>
              <Button color="primary" onClick={this.props.connectTronWallet} style={{float:"right"}}>TronLink</Button>

              

              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined} style={{top:"10%"}}>

                <ModalHeader>What is a VIP ??</ModalHeader>
                <ModalBody>
                    <h4>VIP give you the acces to Enjoy multisender for lifetime without any Extra transaction fee on our Platform.</h4>
                    <h5>You can be a VIP by paying 1 ETH or 500 PZS</h5>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>Cool</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAll}>Exit</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
              {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
            </ModalFooter>
          </Modal>
        </div>
      );
  }

  
}

export default ConnectWallet;