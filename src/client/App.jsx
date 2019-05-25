import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';

import TakePhoto from './components/receipt/takePhoto';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WholeSummary from './components/wholeSummary/wholeSummary';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            receipt: [],
            hasReceipt: false,
            verifyReceipt: false,
        }
    }

    getReceiptHandler=()=>{ //clunky way to retrieve backend data on RECEIPT and ITEMS. sends two request.
        //retrieves receipt and item info
        console.log('SEND AND GET SOMETHING')
        var reactThis = this;
        var img_token = 'guQnFRzRY4MXMm6F'; // need to find a way to retrieve img token..... !!!!!!!*(****!!!)
        var receipt_id;
        var obj = {};

        async function getReceipt(token){ // async request to backend

            let response = await fetch(`/receipt/${img_token}`);
            let data = await response.json();
            return data;
        }

        async function getItems(id){ // async request to backend

            let response = await fetch(`/items/${id}`);
            let data = await response.json();
            return data;
        }
        getReceipt(img_token).then(receiptOutput=> { //sending request to get receipt

            receipt_id = receiptOutput[0].id;
            getItems(receipt_id).then(itemOutput=>{ // sending request to get items

                obj =  { // arranging response jsons. Saving obj to this.state.receipt
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
                this.doneViewingReceiptHandler(); // toggles condition to view receipt component
            })
        })
    }

    doneViewingReceiptHandler =()=>{
        this.setState( {hasReceipt: true} );
    }

    pickMeUp = (input, itemLocation) =>{ //function to take values from tableElement and update app.jsx's this.state.receipt items

        let latestEdit = input; //user edited input
        let itemId = itemLocation[0]; //which item is this?
        let itemType = itemLocation[1]; //which key is it?

        let receipt = Object.assign({},this.state.receipt);
        if(itemType === 'price' ){
            receipt.items[itemId][`${itemType}`] = Number(latestEdit);
        }else if(itemType === 'quantity'){
            receipt.items[itemId][`${itemType}`] = Number(latestEdit);
        }else{
            receipt.items[itemId][`${itemType}`] = latestEdit;
        }
        this.setState({receipt});

        console.log(receipt);

        this.quickMath();
    }

    quickMath = () =>{ // when user edits receipt, function checks prices and updates state
        let updatedReceiptItems = this.state.receipt;
        let prices = [];

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        for(let i = 0; i < updatedReceiptItems.items.length; i ++){
            prices.push(updatedReceiptItems.items[i].price);
        }

        let newSubtotal = prices.reduce(reducer);
        let newSc = newSubtotal * 0.1;
        let newGst = (newSubtotal + newSc) * 0.07;
        let newTotal = newSubtotal + newSc + newGst;

        let receipt = Object.assign({},this.state.receipt);

            receipt.subtotal = (newSubtotal).toFixed(2);
            receipt.serviceCharge = (newSc).toFixed(2);
            receipt.gst = (newGst).toFixed(2);
            receipt.total = (newTotal).toFixed(2);

            this.setState({receipt});
    }

    render() {
        const proceedToReceipt = this.state.hasReceipt;
        const proceedToItemSelection = this.state.verifyReceipt;
        return (
        /*

        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/takePhoto" component={TakePhoto} />
        </Router>
        */
        <div>
            {proceedToReceipt ? (<p></p>) : (<button onClick={()=>{this.getReceiptHandler()}}>PRESS THIS INSTEAD</button>)}
            {proceedToReceipt ? (<Receipt receipt={this.state.receipt} pickMeUp={this.pickMeUp}/>) : (<p></p>)}
            {proceedToItemSelection ? (<Selection/>):(<p></p>)}
            <WholeSummary summary={this.state.receipt}/>
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