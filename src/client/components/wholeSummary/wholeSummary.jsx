import React from 'react';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: {},
            change: false,
            total:0,
        }


    }

    receiptHandler() {

        var reactThis = this;
        console.log("clicking");
        var id = 1;
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
        const receiptItems = this.state.change;

        if(!receiptItems){
        return (
            <div>
                <h1>Bill Summary</h1>
                <button onClick={()=>{this.receiptHandler()}}>Show items</button>
            </div>
        );
    } else {
        return (
            <div>
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
                      <tr>
                          <td><strong>Total $</strong></td>
                          <td></td>
                          <td><strong>{this.state.getTotal}</strong></td>
                      </tr>
                  </tbody>
                </table>
            </div>
            )
        }
    }
}

export default WholeSummary;