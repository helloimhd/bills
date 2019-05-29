import React from 'react';
// import {Username} from './usernameSummary';
import Cookies from 'js-cookie';

class IndividualSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            // receiptItems: {},
            // change: false,
            items: null,
            users: null,
            userDetails :null,
            receipt:null,
            total:0,
        }
    }

    componentDidMount(){
        // this.receiptHandler();
        this.getAllItems();
        this.getAllUsers();
        this.getUsersHandler();
        this.getReceipt();
    }

    getReceipt=()=>{
        let receiptId = 1;
        fetch(`/receipt/${receiptId}`)
          .then(response=>response.json())
          .then(response=>this.setState({receipt: response}))
    }

    getAllItems=()=>{
      let receiptId = 1
      fetch(`/items/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({items: response}))
    }

    getAllUsers=()=>{
      let receiptId = 1
      fetch(`/group/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({users: response}))
    }

    getUsersHandler(){
      fetch(`/search/group`)
        .then(response=>response.json())
        .then(response=>this.setState({userDetails: response.users}))
    }

    render() {

        if (this.state.items === null || this.state.users === null || this.state.userDetails === null ||this.state.receipt === null) {
            return <p>LOADING</p>
        } else {

            let userSummary = this.state.users.map((user,indexUser)=>{
                let otherChargesTotal = this.state.receipt[0].total - this.state.receipt[0].subtotal;
                let peopleInGroup = this.state.users.length;
                let otherChargesSplit = otherChargesTotal/peopleInGroup;

                let itemArr=[];
                let totalPrice = [];
                let putItemsInArr = this.state.items.map((item)=>{
                    for(let i = 0; i < item.users_id.length; i++){
                        if(item.users_id[i] === user.friend_id){
                            // console.log(`${item.item_name} belongs to ${user.friend_id}`);
                            let obj = {
                                    item_name: item.item_name,
                                    price: item.price,
                                    users_id :item.users_id,
                            }
                            itemArr.push(obj);
                        }
                    }
                });

                let itemList = itemArr.map((item,index)=>{
                    // console.log(item.users_id.length);
                    let price = item.price/item.users_id.length;
                    totalPrice.push(price);
                    return(
                        <p key={index}>{item.item_name}   ${price}</p>
                    );
                })

                let userForCurrent;
                let userName = this.state.userDetails.map((userDetail,index)=>{
                    if(userDetail.id === user.friend_id){
                       userForCurrent = userDetail.username;
                    }
                });
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let splitPrice = totalPrice.reduce(reducer) + otherChargesSplit;
                splitPrice = splitPrice.toFixed(2);
                return(
                    <div key={indexUser}>
                        <p>---{userForCurrent}---</p>
                           <div>
                           {itemList}
                           </div>
                        <p>${splitPrice}</p>
                    </div>
                );
            });

            return(
                <div>
                    {userSummary}
                </div>
            );
        }
    }
}

export default IndividualSummary;

/* <Username/> */


        /*
        console.log('check state', this.state.receiptItems);
        const receiptItems = this.state.change;

        if(!receiptItems){
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
        */