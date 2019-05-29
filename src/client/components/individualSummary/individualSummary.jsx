import React from 'react';
// import {Username} from './usernameSummary';
import Cookies from 'js-cookie';

class IndividualSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: null,
            // change: false,
            getTotal: 0,
        }
    }

    receiptHandler() {

        var reactThis = this;
        // console.log("clicking");
        var id = 1;
        // var id = Cookies.get('receiptId');
        fetch(`/summary/user/${id}`, {

        }).then(res => {
            return res.json()
        }).then(json =>{
            // console.log('in the jsx summary', json);
            let obj = json;
            this.setState({receiptItems: obj});
            // console.log(this.state.receiptItems[1].users_id);
            this.setState({change: true});

            // Add the price of items together after splitting items
            let getTotal = 0;
            let priceArr =[];

            for (let allPrices in obj) {
                let itemPrice = obj[allPrices].price
                let splitSize = obj[allPrices].users_id.length

                let splitPrice = itemPrice/splitSize;
                priceArr.push(splitPrice);
                // const addAllPrices = obj[allPrices].price
                // console.log(addAllPrices)
                getTotal += splitPrice;
                console.log(getTotal);
            }

            this.setState({getTotal: getTotal})

        })
    }

    render() {
        // console.log('check state', this.state.receiptItems);
        const receiptItems = this.state.change;

        if(this.state.receiptItems === null){
        return (
            <div>
                <h1>Your Bill Summary</h1>
                <button onClick={()=>{this.receiptHandler()}}>Show items</button>
            </div>
        );
        } else {
            return (
                <div>
                    <h1>Your Bill Summary</h1>
                    <table>
                      <tbody>
                          <tr>
                              <td><strong>Receipt ID</strong></td>
                              <td><strong>Item Name</strong></td>
                              <td><strong>Price</strong></td>
                              <td><strong>Quantity</strong></td>
                          </tr>
                              {this.state.receiptItems.map((allItems, i) => {
                                let price = (allItems.price / allItems.users_id.length).toFixed(2)
                                let quantity = allItems.quantity / allItems.users_id.length
                                    return (
                                      <tr key={i}>
                                          <td>
                                          {allItems.receipt_id}
                                          </td>
                                          <td>
                                          {allItems.item_name}
                                          </td>
                                          <td>
                                          {price}
                                          </td>
                                          <td>
                                          {quantity}
                                          </td>
                                      </tr>
                                    )}
                                )}
                          <tr>
                              <td><strong>Total $</strong></td>
                              <td></td>
                              <td><strong>{(this.state.getTotal).toFixed(2)}</strong></td>
                          </tr>
                      </tbody>
                    </table>
                </div>
                )
        }
    }
}

export default IndividualSummary;