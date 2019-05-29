import React from 'react';
// import {Username} from './usernameSummary';
import Cookies from 'js-cookie';

class IndividualSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            items: null,
            users: null,
            userDetails :null,
            receipt:null,
            saveAmount: [],
            total:0,
        }
    }

    componentDidMount(){

        this.getAllItems();
        this.getAllUsers();
        this.getUsersHandler();
        this.getReceipt();
    }

    getReceipt=()=>{
        let receiptId = Cookies.get('receiptId');
        fetch(`/receipt/${receiptId}`)
          .then(response=>response.json())
          .then(response=>this.setState({receipt: response}))
    }

    getAllItems=()=>{
      let receiptId = Cookies.get('receiptId');
      fetch(`/items/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({items: response}))
    }

    getAllUsers=()=>{
      let receiptId = Cookies.get('receiptId');
      fetch(`/groupSummary/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({users: response}))
    }

    getUsersHandler(){
      fetch(`/search/group`)
        .then(response=>response.json())
        .then(response=>this.setState({userDetails: response.users}))
    }

    updateIndvAmount(){

        let items = this.state.items;
        let input = {obj : items};
        console.log(input);
        fetch(`/update/items`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(input),
        }).then(res=>console.log('Updated items'));

    }

    ownerOfReceipt(){
        return 1;
        // let ownerId = this.state.receipt[0].users_id;
        // let owner;
        // this.state.userDetail.forEach((i)=>{
        //     if(i.id === ownerId){
        //         owner = i.username;
        //     }
        // })
        // console.log(owner);
        // return owner;
    }

    saveAmount(userId,splitPrice){
        let saveAmountState = this.state.saveAmount;
        let obj = {
                user_id: userId,
                amount: splitPrice,
            }
        saveAmountState.push(obj);
        this.setState({saveAmount: saveAmountState});
    }
    render() {

        if (this.state.items === null || this.state.users === null || this.state.userDetails === null ||this.state.receipt === null) {
            return <p>LOADING</p>
        } else {
                let owner = this.ownerOfReceipt();
                console.log('asdfas',owner)
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
                    price = price.toFixed(2);
                    return(
                        <p key={index}>{item.item_name}   ${price}</p>
                    );
                })

                let userForCurrent, userIdCurrent;
                let userName = this.state.userDetails.map((userDetail,index)=>{
                    if(userDetail.id === user.friend_id){
                       userForCurrent = userDetail.username;
                       userIdCurrent = userDetail.id;
                    }
                });
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let splitPrice = totalPrice.reduce(reducer) + otherChargesSplit;
                splitPrice = splitPrice.toFixed(2);
                return(
                    <div key={indexUser}>
                        <p>{userForCurrent}</p>
                           <div>
                           {itemList}
                           </div>
                        <p>${splitPrice}</p>
                    </div>
                );
            });

            return(
                <div>
                    <p>Pay It</p>
                    {userSummary}
                    <a href='/'>Back to Home</a>
                </div>
            );
        }
    }
}

export default IndividualSummary;