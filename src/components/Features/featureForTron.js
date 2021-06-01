import React, { Component, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ReactFileReader from "react-file-reader";
import web3 from "web3";
import ERC20Abi from "../../contracts/ERC20ABI.json";
import swal from "sweetalert";
import generateElement from "../../generateElement";
import PopUpModel from "./popUp";
import Swal from "sweetalert2";

import SectionTitle from "../common/section-title";

export default function Features(props) {

    const [loading, setLoading] = useState(false);
    const [trxAddresses,setTrxAddresses] = useState([]);
    const [trxBalances,setTrxBalances] = useState([]);
    const [totalTrxAmount, setTotalTrxAmount] = useState("");
    const [showTrxAddresses, setShowTrxAddresses] = useState([])

    const [tokenAddresses,setTokenAddresses] = useState([]);
    const [tokenBalances,setTokenBalances] = useState([]);
    const [TRC20Address,setTRC20Address] = useState("");
    const [showTokenAddresses,setShowTokenAddresses] = useState([]);

  

    const uploadCsvForTrx = async (files) => {

        var reader = new FileReader();
     
        reader.onload = function(e) {
            
            setShowTrxAddresses(reader.result);
            var count = 0;
            let lines = reader.result.split('\n');
            // console.log(lines)
            lines.forEach(element => {

                if(element !== ""){
                    var temp = element.split(",");
                    trxAddresses.push(temp[0]);
                    trxBalances.push((temp[1]*1000000).toString());  
                }
                
            });

            
            trxBalances.forEach(function(item) {
                count = count + parseFloat(item / (10 ** 6));
            });

            setTotalTrxAmount(count)
            // console.log(count);
            // console.log(trxAddresses);
            // console.log(trxBalances)
            setTrxAddresses(trxAddresses);
            setTrxBalances(trxBalances);  
        }
        reader.readAsText(files[0]);
       
    }

    const uploadCsvForToken = (files) => {

        var reader = new FileReader();
        reader.onload = function(e) {

            setShowTokenAddresses(reader.result);
            let lines = reader.result.split('\n');

            lines.forEach(element => {

                if(element !== ""){
                    var temp = element.split(",");
                    tokenAddresses.push(temp[0]);
                    tokenBalances.push((temp[1]*1000000).toString()); 
                }
                             
            });


            // console.log(tokenAddresses);
            // console.log(tokenBalances)
            setTokenAddresses(tokenAddresses);
            setTokenBalances(tokenBalances);    
        }
        reader.readAsText(files[0]);

    }


    const sendTrx = () => {

        

        if(props.multisender === undefined){
            swal({
                content:generateElement(`Connect Wallet First`),
                icon:"error"
            })
            return
        }

        if(totalTrxAmount === ""){
            swal({
                content:generateElement(`Upload CSV first`),
                icon:"error"
            })
            return
        }

        
        var Amount;

        // var isVip = await props.multisender.isVIP(props.address).call()

        // if(!isVip){
        //     Amount = (totalTrxAmount + 100).toString()
        // }
        // else{
        //     Amount = (totalTrxAmount)
        // }
        

        Amount = (totalTrxAmount + 100).toString();

        // console.log(Amount)


        props.multisender.MutiSend_TRX_With_With_DifferentValue(trxAddresses,trxBalances).send({
            // shouldPollResponse:true,
            callValue: (Amount * (10 ** 6))
        })
        .then(() => {
            Swal.fire({
                title: 'Track Your Transaction here',
                text:'Click on the link below to track your transaction on tronscan',
                footer:`<a target="_blank" href="https://tronscan.org/#/address/${ props.address }/transactions">Track Transaction</a>`,
                showConfirmButton: false,
                showCloseButton:true,
                
            })
        })

        // setTimeout(function() {
        //     Swal.fire({
        //         title: 'Track Your Transaction here',
        //         text:'Click on the link below to track your transaction on tronscan',
        //         footer:`<a target="_blank" href="https://shasta.tronscan.org/#/address/${ props.address }/transactions">Track Transaction</a>`,
        //         showCloseButton: false
        //     })
        // },1);

        setShowTrxAddresses([]);
        setTrxAddresses([]);
        setTrxBalances([]);
        setTotalTrxAmount("")

        
    }

    const Initilaized = async () => {

        if(props.multisender === undefined){
            swal({
                content:generateElement(`Connect Wallet First`),
                icon:"error"
            })
            return
        }

        if(TRC20Address === ""){
            swal({
                content:generateElement(`Enter Token Contract address first`),
                icon:"error"
            })
            return
        }

        const tokenContract = await window.tronWeb.contract().at(TRC20Address);

        tokenContract.approve("TQTj8YcTGLidbFz2oZ2K8EZMd7LuxD3Qrc","1000000000000").send({
            // shouldPollResponse:true,
            callValue:0
        })
        .then(() => {
            Swal.fire({
                title:'Initilized',
                icon:"success"
            })
        })

        setTRC20Address("");

    }

    const sendTRC20 = () => {

        if(props.multisender === undefined){
            swal({
                content:generateElement(`Connect Wallet First`),
                icon:"error"
            })
            return
        }

        var Amount;

        Amount = (100).toString();

        // var isVip = await props.multisender.isVIP(props.address).call()

        // if(!isVip){
        //     Amount = (100).toString()
        // }
        // else{
        //     Amount = (0).toString()
        // }


        if(TRC20Address === ""){
            swal({
                content:generateElement(`Enter Token Contract Address first`),
                icon:"error"
            })
            return
        }

        if(tokenAddresses.length === 0){
            swal({
                content:generateElement(`Upload CSV firts`),
                icon:"error"
            })
            return
        }


        props.multisender.mutiSendCoinWithDifferentValue(TRC20Address,tokenAddresses,tokenBalances).send({
            // shouldPollResponse:true,
            callValue:(Amount * (10 ** 6))
        })
        .then(() => {
            Swal.fire({
                title: 'Track Your Transaction here',
                text:'Click on the link below to track your transaction on tronscan',
                footer:`<a target="_blank" href="https://tronscan.org/#/address/${ props.address }/transactions">Track Transaction</a>`,
                showConfirmButton: false,
                showCloseButton:true,
                
            })
        })

        setTRC20Address("");
        setShowTokenAddresses([]);
        setTokenAddresses([]);
        setTokenBalances([]);
        
    }


        return (
            <React.Fragment>
                <section className="section" id="features">
                
                    <Container>  

                    <SectionTitle title="MultiSend Tron" description="Description Here."/>
                    
                        <Row className="align-items-center">
                            <Col lg="5" className="order-2 order-lg-1">
                                <div ><h2>Transfer TRX</h2></div>
                                <div className="features-box mt-5 mt-lg-0">
                                <div className="custom-form mt-4 pt-4">
                                    <div id="message"></div>
                                    <AvForm name="contact-form" id="contact-form">
                                        <Row>
                                            <Col lg="6">
                                                <AvField readOnly="true" type="text" className="form-group mt-2" name="name" id="name" placeholder="Total Amount in TRX*" 
                                                   value={totalTrxAmount}
                                                />
                                               
                                            </Col>  
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <div className="form-group mt-2">
                                                    <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"
                                                        value={showTrxAddresses}
                                                    >

                                                    </textarea>
                                                    {/* <p>Upload upto 150 Addresses at a time.</p> */}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6" className="text-left">
                                                <ReactFileReader fileTypes={[".csv",".xlsx","xlsm",".xlsb","xltx",".xltm",".xls",".xlt",".xml",".xlam",".xla","xlw",".xlr"]} multipleFiles={false} handleFiles={uploadCsvForTrx}>
                                                    <button  className="submitBnt btn btn-custom">Upload CSV file </button>
                                                    <div id="simple-msg"></div>
                                                </ReactFileReader>
                                                
                                            </Col>
                                            <Col lg="6" className="text-right">
                                                <button  className="submitBnt btn btn-custom" onClick={sendTrx}>Send <i className="mdi mdi-arrow-right"></i></button>
                                                <div id="simple-msg"></div>
                                            </Col>
                                            
                                            {/* <PopUpModel sendTrx = {sendTrx} loading={loading}/> */}
                                            
                                        </Row>
                                        
                                    </AvForm>
                                    

                                    
                                </div>
                                </div>
                            </Col>

                            <Col lg={{size: 1, order: 3}} xs={{order:2}}></Col>

                            <Col lg={{size: 6, order: 3, }} xs={{order : 3}} className="order-2 order-lg-1">
                                <div ><h2>Transfer TRC20</h2></div>
                                <div className="features-box mt-5 mt-lg-0">
                                    <div className="custom-form mt-4 pt-4">
                                    <AvForm>
                                            <Row>
                                                <Col lg="8">
                                                    <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Token Contract Address*" 
                                                        
                                                        value={TRC20Address}
                                                        onChange = {(event) => setTRC20Address(event.target.value)}
                                                    />
                                                </Col>
                                                {/* <Col lg="4">
                                                    <AvField type="text" className="form-group mt-2" name="name" id="name" placeholder="Decimal*" required
                                                        
                                                        
                                                        
                                                    />
                                                </Col> */}
                                            </Row>
                                            <Row>
                                                <Col lg="12">
                                                    <div className="form-group mt-2">
                                                        <textarea readOnly="true" name="comments" id="comments"  rows="4" className="form-control" placeholder="List of Addresses in CSV"
                                                           value={showTokenAddresses}
                                                        >

                                                        </textarea>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4" className="text-left">
                                                    <button  className="submitBnt btn btn-custom" onClick={Initilaized}>Initialize</button>
                                                    <div id="simple-msg"></div>    
                                                </Col>
                                                <Col lg="4" className="text-center">
                                                    <ReactFileReader fileTypes={[".csv",".xlsx","xlsm",".xlsb","xltx",".xltm",".xls",".xlt",".xml",".xlam",".xla","xlw",".xlr"]} multipleFiles={false} handleFiles={uploadCsvForToken}>
                                                        <button  className="submitBnt btn btn-custom">Upload CSV file </button>
                                                        <div id="simple-msg"></div>
                                                    </ReactFileReader>                                                  
                                                </Col>
                                                <Col lg="4" className="text-right">
                                                    <button  className="submitBnt btn btn-custom" onClick={sendTRC20}>Send <i className="mdi mdi-arrow-right"></i></button>
                                                    <div id="simple-msg"></div>
                                                </Col>
                                            </Row>
                                        </AvForm>
                                    </div>
                                </div>
                                
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    // }
}

