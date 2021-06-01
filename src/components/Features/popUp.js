import React, { useState, Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import swal from "sweetalert";
import generateElement from "../../generateElement";


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

    


  render() {

    return (
        <div>
           
           
            <Button color="success" onClick={() => {
                this.setState({modal: !this.state.modal}, () => {
                    this.props.sendTrx();
                })
            }}>Hello</Button>
            
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} style={{top:"20%"}}>
            <ModalHeader toggle={this.toggle}>Wanna be A VIP</ModalHeader>
            <ModalBody>
                {
                    this.props.loading ?
                    <h4>Processing.....</h4>
                    :
                    <h4>Hello</h4>
                }
                
                
               
              <br />
              {/* <Button color="primary" onClick={this.toggleNested}>Why VIP ?</Button>
              <Button color="primary"  style={{float:"right"}} onClick={this.registerVIP}>Register</Button> */}

              

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