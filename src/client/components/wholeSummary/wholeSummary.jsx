import React from 'react';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: {},
            change: false,
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
            console.log(this.state.receiptItems);
            console.log(this.state.change);
        })
    }

    render() {
        console.log('check state', this.state.receiptItems);
        const receiptItems = this.state.change;

        if(!receiptItems){
        return (
            <div>
                <h1>This will show the entire summary of the bill after user has assigned all items</h1>
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
                          {this.state.receiptItems.map((allItems, i) => (
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
                          ))}
                      <tr>
                          <td><strong>Total $</strong></td>
                          <td></td>
                          <td>$$$</td>
                      </tr>
                  </tbody>
                </table>
            </div>
            )
        }
    }
}

export default WholeSummary;