import React, { Component } from 'react';
import Index3 from "./Index3/Index3";
import MultiSenderContract from "../contracts/MultiSender.json";
import Web3 from "web3"

export default class Metamask extends Component {

    constructor(props){
        super(props);

        this.state = {
            web3: null,
            accounts: null, 
            MultiSender: null, 
            loaded:false, 
            walletConnected: false,
        }
    }

    handleConnectWallet = async () => {
      
        const {ethereum } = window;
   
        if(!ethereum){
          throw new Error("Web3 not found");
        }
   
        const web3 = new Web3(ethereum);
        await ethereum.enable();
        console.log(web3);
   
        
   
       const accounts = await web3.eth.getAccounts();
   
       const MultiSender = new web3.eth.Contract(MultiSenderContract,"0x5D007190CfD702ebEAd392287eD3CDFa0ff545Bb")
       console.log(MultiSender)
   
         this.setState({web3,accounts, MultiSender, loaded:true, walletConnected:true, vipAddress:true });
   
       }

    render() {
        if (!this.state.loaded) {
       
         return(
           <Index3 
             walletConnected={this.state.walletConnected} 
             handleConnectWallet = {this.handleConnectWallet}
             
           />
         )
       }
         return (
           <React.Fragment>
             <Index3 
               account = {this.state.accounts[0]} 
               multiSender = {this.state.MultiSender} 
               web3 = {this.state.web3} 
               walletConnected = {this.state.walletConnected}
               handleConnectWallet = {this.handleConnectWallet}
              
               
               />
         </React.Fragment>
       );
    }
}
