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

class ModalExample extends Component {
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

    registerVIP = async() => {

      if(!this.props.walletConnected){
        swal({
          content: generateElement(`Connect to wallet first`),
          icon: "error",
        })
        return
      }

      else {
        var isVip = await this.props.multisender.isVIP(this.props.address).call()

        if(isVip){
          swal({
              content: generateElement(`This Account is already a VIP`),
              icon: "error",
          })
          return
        }

        else{
          const result = await this.props.multisender.registerVIP().send({
            shouldPollResponse:true,
            callValue:1000000000
          })

          swal({
            content: generateElement(`Congratulation you are a VIP now`),
            icon: "success",
          })
        }
      
      }
      
    }


  render() {

    return (
        <div>
            {
                !this.props.walletConnected 
                ? (
                    <Button onClick={this.toggle} style={{marginRight:"10px",backgroundColor:"#B80F0A"}}>VIP</Button>
                )
                :
                (
                    <Button color="danger" onClick={this.toggle}>VIP</Button>
                )
            }
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} style={{top:"20%"}}>
            <ModalHeader toggle={this.toggle}>Wanna be A VIP</ModalHeader>
            <ModalBody>
                
                <h3>Get lifetime free access with Special offer available with only PZS .</h3>
                <h5>Simply click register and be a VIP</h5>
                
               
              <br />
              <Button color="primary" onClick={this.toggleNested}>Why VIP ?</Button>
              <Button color="primary"  style={{float:"right"}} onClick={this.registerVIP}>Register</Button>

              

              <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined} style={{top:"10%"}}>

                <ModalHeader>What is a VIP ??</ModalHeader>
                <ModalBody>
                    <h4>VIP give you the acces to Enjoy multisender for lifetime without any Extra transaction fee on our Platform.</h4>
                    <h5>You can be a VIP by paying 1000 TRX</h5>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleNested}>Cool</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAll}>Exit</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </Modal>
        </div>
      );
  }

  
}

export default ModalExample;