import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            receipt: [],
        }

    }

    getReceiptHandler=()=>{
        //retrieves receipt and item info
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
                    sub_total: receiptOutput[0].sub_total,
                    items: itemOutput,
                        }

                this.setState( {receipt: obj} );
            })
        })
    }

  render() {
    return (
      <div>
        <Receipt getReceiptHandler={this.getReceiptHandler}/>
        <Selection/>
      </div>
    );
  }
}

export default hot(module)(App);