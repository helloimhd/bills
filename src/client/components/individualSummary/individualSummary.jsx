import React from 'react';
// import {Username} from './usernameSummary';
import Cookies from 'js-cookie';

import styles from './style.scss';

class IndividualSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            items: null,
            users: null,
            userDetails :null,
            receipt:null,
            saveAmount: null,
            total:0,
        }
    }

    componentDidMount(){

        this.getAllItems();
        this.getAllUsers();
        this.getUsersHandler();
        this.getReceipt();

        setTimeout(() =>{this.calcAmount()}, 1000);
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

    calcAmount=()=>{

        let usersGroupsArr = this.state.users;
        let itemsList = this.state.items;
        let otherChargesTotal =  this.state.receipt[0].total - this.state.receipt[0].subtotal;
        let otherChargesSplit = otherChargesTotal/usersGroupsArr.length;
        let objToSave = [];

        usersGroupsArr.forEach(user=>{
            let itemArr=[];
            let totalPrice = [];
            itemsList.forEach(item=>{
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
            })

            itemArr.forEach(item=>{
                // console.log(item.users_id.length);
                let price = item.price/item.users_id.length;

                totalPrice.push(price);

            })
            const reducer = (accumulator, currentValue) => accumulator + currentValue;

            let priceToSave = totalPrice.reduce(reducer) + otherChargesSplit;
            let plsSave = {
                userId: user.friend_id,
                // Math.round((priceToSave + 0.00001) * 100) / 100
                amount: Math.round((priceToSave + 0.001) * 100) / 100,
                receiptId : user.receipt_id,
            }

            objToSave.push(plsSave);
        })

        console.log(objToSave);

        this.setState({saveAmount:objToSave});

        // this.updateIndvAmount(this.state.saveAmount);
    }

    updateIndvAmount=()=>{
        // this.state.saveAmount
        let items = this.state.saveAmount;
        let input = {obj : items};
        console.log(input);
        fetch(`/save/group`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(input),
        }).then(res=>console.log('Updated group amount!'));
    }

    render() {

        if (this.state.items === null || this.state.users === null || this.state.userDetails === null ||this.state.receipt === null) {
            return <p>LOADING</p>
        } else {

            let userSummary = this.state.users.map((user,indexUser)=>{

                let otherChargesTotal = this.state.receipt[0].total - this.state.receipt[0].subtotal;
                let peopleInGroup = this.state.users.length;
                let otherChargesSplit = (otherChargesTotal/peopleInGroup);

                let itemArr=[]; //items belonging to user[index]
                let totalPrice = []; //all prices of itemArr
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
                        <h2 key={index}>{item.item_name}   ${price}</h2>
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
                    <div key={indexUser} className={styles.cleaner}>
                        <h1 className={styles.lineManager}>{userForCurrent}</h1>
                           <div>
                           {itemList}
                           </div>
                           <h2>Service & GST: ${otherChargesSplit.toFixed(2)}</h2>
                        <h1 className={styles.cleaner}>${splitPrice}</h1>
                    </div>
                );
            });

            return(
                <React.Fragment>
                    <div className={styles.headerSummary}>
                      <h1 className={styles.textCenterSummary}>Individual Payment Summary</h1><br/>
                    </div>
                    <div style={{marginTop: 80 + "px"}}>
                        <div>
                            {userSummary}
                        </div>
                    </div>
                        <button className={styles.button} onClick={()=>{this.updateIndvAmount()}}><a href='/'>Back to Home</a></button>
                </React.Fragment>
            );
        }
    }
}

export default IndividualSummary;