import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';

import TakePhoto from './components/receipt/takePhoto';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WholeSummary from './components/wholeSummary/wholeSummary';

import Test from './components/test/test';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            receipt: [],
            hasReceipt: false,
            hasCheckedItems:false,
        }
    }

    getReceiptHandler=()=>{
        //retrieves receipt and item info
        console.log('SEND AND GET SOMETHING')
        var reactThis = this;
        var img_token = 'guQnFRzRY4MXMm6F';
        var receipt_id;
        var obj = {};

        async function getReceipt(token){

            let response = await fetch(`/receipt/${img_token}`);
            let data = await response.json();
            return data;
        }

        async function getItems(id){

            let response = await fetch(`/items/${id}`);
            let data = await response.json();
            return data;
        }
        getReceipt(img_token).then(receiptOutput=> {

            receipt_id = receiptOutput[0].id;
            getItems(receipt_id).then(itemOutput=>{

                obj =  {
                    receipt_id: receiptOutput[0].id,
                    user_id: receiptOutput[0].user_id,
                    group_id: receiptOutput[0].group_id,
                    img_token: receiptOutput[0].img_token,
                    subtotal: (receiptOutput[0].subtotal).toFixed(2),
                    serviceCharge: (receiptOutput[0].subtotal*0.1).toFixed(2),
                    gst: (receiptOutput[0].subtotal*0.07).toFixed(2),
                    total: ((receiptOutput[0].subtotal*0.1) + (receiptOutput[0].subtotal*0.07) + (receiptOutput[0].subtotal)).toFixed(2),
                    items: itemOutput,
                    };

                this.setState( {receipt: obj} );
                this.doneViewingReceiptHandler();
            })
        })
    }

    doneViewingReceiptHandler =()=>{
        this.setState( {hasReceipt: true} );
    }

    testHandler=()=>{
        this.setState( {hasCheckedItems:true} )

    }

  render() {

    const proceedToReceipt = this.state.hasReceipt;
    return (

        /*
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/takePhoto" component={TakePhoto} />

      </Router>
    */

      <div>
        {proceedToReceipt ? (<p></p>) : (<button onClick={()=>{this.getReceiptHandler()}}>PRESS THIS INSTEAD</button>)}
        {proceedToReceipt ? (<Receipt receipt={this.state.receipt}/>) : (<p></p>)}
        <WholeSummary summary={this.state.receipt}/>
        <Test/>
      </div>
    );
  }
}

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}



export default hot(module)(App);