import React from 'react';
import { Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';

import TakePhoto from './components/receipt/takePhoto';
import Login from './components/user/login';
import Register from './components/user/register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import WholeSummary from './components/wholeSummary/wholeSummary';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            receipt: [],
            hasReceipt: false,
            usernameCookie: null,
            isLoggedIn: false,
        }
    }

    toggleLoggedIn = () => {
        this.setState({isLoggedIn: !this.state.isLoggedIn});
        //this.setState({isLoggedIn: true});
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

    pickMeUp = (input, itemLocation) =>{

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
    }


    quickMath = () =>{
        let receipt = this.state.receipt;
    }

  render() {

    const proceedToReceipt = this.state.hasReceipt;

    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/takePhoto" component={TakePhoto} />
      </Router>


     /* <div>
        <Receipt getReceiptHandler={this.getReceiptHandler}/>
        <Selection giveItems={this.state.receipt} handler={this.testHandler}/>
        <WholeSummary/>
      </div> */


    /* <div>
        {proceedToReceipt ? (<p></p>) : (<button onClick={()=>{this.getReceiptHandler()}}>PRESS THIS INSTEAD</button>)}
        {proceedToReceipt ? (<Receipt receipt={this.state.receipt} pickMeUp={this.pickMeUp}/>) : (<p></p>)}
        <WholeSummary summary={this.state.receipt}/>
      </div> */

    );
  }
}

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
        }
    }

    // checkIsLoggedIn = () => {
    //     fetch('/checkCookie')
    //       .then(function(response) {
    //         return response.json();
    //       })
    //       .then(function(myJson) {
    //         if (myJson.isLoggedIn === true) {
    //             this.setState({isLoggedIn: true})
    //         } else {
    //             this.setState({isLoggedIn: false})
    //         }
    //       });
    // }

    renderRedirect = () => {
        let reactThis = this;
        fetch('/checkCookie')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson)
            if (myJson.isLoggedIn === true) {
                return <Redirect to='/' />
            } else if (myJson.isLoggedIn === false) {
                console.log("alsdad")
                return <Redirect to='/login' />
            }
            // if (myJson.isLoggedIn === true) {
            //     reactThis.setState({isLoggedIn: true})
            //     <Redirect to='/' />

            // } else {
            //     reactThis.setState({isLoggedIn: false})
            //     <Redirect to='/login' />
            // }
        });
    }



    render(){
        return (
            <div>
            {this.renderRedirect()}
                <h1>Home</h1>
                <p>aksjdhaskdhasd</p>
            </div>
        )
    }

}



export default hot(module)(App);