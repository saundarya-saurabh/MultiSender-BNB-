import React, { Component } from 'react';
import TronWeb from "tronweb";
import Index4 from "./Index3/Index4";
import swal from "sweetalert";
import generateElement from "../generateElement";
import Swal from "sweetalert2"

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

export default class Tron extends Component {

    
  constructor(props){
    super(props);
    this.state = {

      tronAddress:"",
      tronBalance:0,
      tronInstance:null,
      loaded:false,
      walletConnected:false,
      MultiSenderContract:null,

      tronWeb: {
        installed: false,
        loggedIn: false
      },
    };
  }


  
  connectTronWallet = async () => {

    await new Promise(resolve => {
      const tronWebState = {
          installed: !!window.tronWeb,
          loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if(tronWebState.installed) {
          this.setState({
              tronWeb:
              tronWebState
          });

          return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
          if(tries >= 10) {
              const TRONGRID_API = 'https://api.trongrid.io';

              window.tronWeb = new TronWeb(
                  TRONGRID_API,
                  TRONGRID_API,
                  TRONGRID_API
              );

              this.setState({
                  tronWeb: {
                      installed: false,
                      loggedIn: false
                  }
              });

              clearInterval(timer);
              return resolve();
          }

          tronWebState.installed = !!window.tronWeb;
          tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

          if(!tronWebState.installed)
              return tries++;

          this.setState({
              tronWeb: tronWebState
          });

          resolve();
      }, 100);
  });

  if(!this.state.tronWeb.installed){
    Swal.fire({
        title: 'TronLink not installed',
        text:'Click on the link below to install',
        footer:`<a target="_blank" href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">Install TronLink</a>`,
        showConfirmButton: false,
        showCloseButton:true,
        
    })
    return;
  }

  if(!this.state.tronWeb.loggedIn) {
    

    window.tronWeb.defaultAddress = {
      hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
      base58: FOUNDATION_ADDRESS
    };

      window.tronWeb.on('addressChanged', () => {
          if(this.state.tronWeb.loggedIn)
              return;

          this.setState({
              tronWeb: {
                  installed: true,
                  loggedIn: true
              }
          });
      });

      swal({
        content:generateElement(`TronLink is locked, Please Unlock it First`),
        icon:"error"
    })
  }

  



  this.setState({tronInstance:window.tronWeb}, () => {
    // console.log(this.state.tronInstance)
  })


  
  const temp_account = this.state.tronInstance.address.fromHex((((await this.state.tronInstance.trx.getAccount()).__payload__).address).toString())

  const account = this.state.tronInstance.defaultAddress.base58;

//   const vikas = this.state.tronInstance.address.toHex("TRAZR47Go2RBnLT5hpotBtcGmpfpyaA6WF");
//   console.log("vikas address",vikas)

  const temp_balance = (await this.state.tronInstance.trx.getBalance(account))/(10 ** 6);

  const temp_Contract = await this.state.tronInstance.contract().at("TQTj8YcTGLidbFz2oZ2K8EZMd7LuxD3Qrc");
 
  
  this.setState({tronAddress:account, tronBalance:temp_balance, loaded:true, walletConnected:true, MultiSenderContract:temp_Contract})

//   console.log(this.state.tronAddress, this.state.tronBalance)
//   console.log(this.state.MultiSenderContract)

  
  
  }

    render() {
        if(!this.state.loaded){
            return(
                <Index4 
                    walletConnected = {this.state.walletConnected}
                    connectTronWallet = {this.connectTronWallet}
                />
            )
        }

        return(
            <Index4 
                walletConnected = {this.state.walletConnected}
                connectTronWallet = {this.connectTronWallet}
                address = {this.state.tronAddress}
                MultiSenderContract = {this.state.MultiSenderContract}
            />
        )
    }
}
