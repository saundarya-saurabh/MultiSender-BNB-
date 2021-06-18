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
            netId:null
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
   
        const netId=await web3.eth.net.getId();
        console.log(netId);
        this.setState({netId})
   
       const accounts = await web3.eth.getAccounts();
       console.log(accounts)
       const MultiSender = new web3.eth.Contract(MultiSenderContract,"0x5D007190CfD702ebEAd392287eD3CDFa0ff545Bb")
       console.log(MultiSender)
        if(this.state.netId===97){
         this.setState({web3,accounts, MultiSender, loaded:true, walletConnected:true, vipAddress:true });
        }
        else{
          window.alert("Please connect to BSC Mainnet");
        }
       }

    render() {
        if (!this.state.loaded  ) {
       
         return(
           
           <Index3 
             walletConnected={this.state.walletConnected} 
             handleConnectWallet = {this.handleConnectWallet}
             
           />
           
           
         )
       }
       else{
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
    }}
}
