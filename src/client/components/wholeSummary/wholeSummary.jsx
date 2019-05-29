import React from 'react';
import Cookies from 'js-cookie';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: null,
            receipt: null,
            // change: false,
            total:0,
        }
    }

    componentDidMount(){

        this.getAllItemsHandler();
        this.getReceiptHandler();
    }

    getReceiptHandler(){

        let receiptId = 1;
        fetch(`/receipt/${receiptId}`)
          .then(response=>response.json())
          .then(response=>this.setState({receipt: response}))
    }


    getAllItemsHandler() {

        var reactThis = this;
        console.log("clicking");
        var id = 1;
        // var id = Cookies.get('receiptId');
        fetch(`/summary/${id}`, {

        }).then(res => {
            return res.json()
        }).then(json =>{
            // console.log('in the jsx summary', json);
            let obj = json;
            this.setState({receiptItems: obj});
            this.setState({change: true});

            // Add the price of items together to get the total amount
            let getTotal = 0;

            for (let allPrices in obj) {
                const addAllPrices = obj[allPrices].price
                console.log(addAllPrices)
                getTotal += addAllPrices;
            }

            this.setState({getTotal: getTotal})

            // console.log(this.state.receiptItems);
            // console.log(this.state.change);
        })
    }

    render() {
        console.log('check state', this.state.receiptItems);
        // const receiptItems = this.state.change;

        if(this.state.receiptItems === null || this.state.receipt ==null){
            return <p>LOADING</p>
        } else {
            return (
                <div>
                    <h1>Bill Summary</h1>
                    <table>
                      <tbody>
                          <tr>
                              <td><strong>Receipt ID</strong></td>
                              <td><strong>Item Name</strong></td>
                              <td><strong>Price</strong></td>
                              <td><strong>Quantity</strong></td>
                          </tr>
                              {this.state.receiptItems.map((allItems, i) => {
                                    return (
                                      <tr key={i}>
                                          <td>
                                          {allItems.receipt_id}
                                          </td>
                                          <td>
                                          {allItems.item_name}
                                          </td>
                                          <td>
                                          {allItems.price}
                                          </td>
                                          <td>
                                          {allItems.quantity}
                                          </td>
                                      </tr>

                                    )}
                                )}
                              <br/>
                          <tr>
                              <td><strong>Sub Total $</strong></td>
                              <td></td>
                              <td><strong> {this.state.getTotal}</strong></td>
                          </tr>
                          <br/>
                          <br/>
                          <tr>
                              <td><strong>Grand Total $</strong></td>
                              <td></td>
                              <td><strong>{this.state.receipt[0].total}</strong></td>
                          </tr>
                      </tbody>
                    </table>
                    <br />
                    <a href="/summaryReceipt">Next Page (Individual)</a>
                </div>
            )
        }
    }
}

export default WholeSummary;