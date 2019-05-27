import React from 'react';

import PropTypes from 'prop-types';
import WholeSummary from '../wholeSummary/wholeSummary';

// import styles from './style.scss';

class ItemElement extends React.Component{
    constructor(){
        super()
        this.state={
            isEditMode: false,
        }
    }

    editItemHandler=(e)=>{
        // console.log('HELLO EDITTING');
        // console.log(this.props);
        this.setState( {isEditMode: !this.state.isEditMode} );

    }

    updateItemHandler = () =>{
        // console.log('HELLO UPDATEEE');
        // console.log(this.refs.input.value);

        this.setState({
            isEditMode:false,
        })

        let itemEdited = this.refs.input.value;

        let itemElement = [];

        itemElement.push(this.props.id);
        itemElement.push(this.props.type);

        this.props.pickMeUp(itemEdited,itemElement);

    }

    renderEditView(item){
        if (typeof item == 'number' && this.props.type == 'price'){
            item = item.toFixed(2);
        };
        return  <td>
                    <input id={this.props.id} type={this.props.type} defaultValue={item} ref="input" />
                    <button onClick={(e)=>{this.editItemHandler(e)}}>❌</button>
                    <button onClick={()=>{this.updateItemHandler()}}>☑️</button>
                </td>
    }

    renderDefaultView=(item)=>{
        if (typeof item == 'number' && this.props.type == 'price'){
            item = item.toFixed(2);
        };
        return <td onClick={(e)=>{this.editItemHandler(e)}}>{item}</td>
    }

    render(){
        const item = this.props.item;
        const editState = this.state.isEditMode;

        return editState ?
            this.renderEditView(item) : this.renderDefaultView(item)
    }
}

class ItemRow extends React.Component{
    constructor(){
        super()
        this.state={
            status:false,
        }
    }
    render(){

        let quantity = "quantity";
        let item_name = "item_name";
        let price = "price";
        return(
            <tr>
                <ItemElement id={this.props.id} type={quantity} item={this.props.item.quantity} pickMeUp={this.props.pickMeUp} status={this.state.status}/>
                <ItemElement id={this.props.id} type={item_name} item={this.props.item.item_name} pickMeUp={this.props.pickMeUp} status={this.state.status}/>
                <ItemElement id={this.props.id} type={price} item={this.props.item.price} pickMeUp={this.props.pickMeUp} status={this.state.status}/>
            </tr>
        );
    }
}

class ItemTable extends React.Component{
    render(){
        const rows = [];
        this.props.items.forEach((item,index)=>{
            rows.push(
                <ItemRow
                    item={item}
                    id={index}
                    key={index}
                    pickMeUp={this.props.pickMeUp}/>
                )
        })
        return(
            <table>
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class PaymentSummary extends React.Component{
    constructor(){
        super();
    }
    render(){

        return(
            <table>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>Sub-Total: </td>
                        <td>$ {this.props.payment.subtotal}</td>
                    </tr>
                    <tr>
                        <td>Service Charge (10%): </td>
                        <td>$ {this.props.payment.serviceCharge}</td>
                    </tr>
                    <tr>
                        <td>GST (7%): </td>
                        <td>$ {this.props.payment.gst}</td>
                    </tr>
                    <tr>
                        <td>Total: </td>
                        <td>$ {this.props.payment.total}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class ButtonProceedTab extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <p>Proceed?</p>
                <button>No</button>
                <button onClick={()=>{this.props.updateReceipt()}}>Yes</button>
            </div>
        );
    }
}

class Receipt extends React.Component{
    constructor(){
        super();
    }  //end of constructor
    render(){
        if(this.props.receipt.length === 0){
            return(
                <div>
                    <p></p>
                </div>
            )
        }else {
            return(
                <div>
                    <ItemTable items={this.props.receipt.items} pickMeUp={this.props.pickMeUp}/>
                    <PaymentSummary payment={this.props.receipt}/>
                    <ButtonProceedTab updateReceipt={this.props.updateReceipt}/>
                </div>
            )
        }
    }
}

class MainReceipt extends React.Component {
    constructor() {
        super();

        this.state = {
            receipt: [],
            // groupMembers: [],
            hasReceipt: false,

            isLoggedIn: false,
        }
    }

    // componentDidMount() {
    //     this.checkLoggedIn();
    // }

    // checkLoggedIn = () => {
    //     let reactThis = this;
    //     fetch('/checkCookie')
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(myJson) {
    //        // console.log(myJson)
    //         if (myJson.isLoggedIn === true) {
    //             reactThis.setState({isLoggedIn: true})

    //         } else if (myJson.isLoggedIn === false) {
    //             reactThis.setState({isLoggedIn: false})
    //         }
    //     });
    // }
    updateReceiptRequest=()=>{

        let input = { obj: this.state.receipt };
        console.log('HELLO ', receiptUpdate);
        fetch(`/receipt/update`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(input),
        }).then(res=>console.log(res.json()));
    }


    updateHandler=()=>{
        this.updateReceiptRequest();
        // this.updateItemsRequest();
    }

    componentDidMount=()=>{
        this.getReceiptHandler();
    }

    getReceiptHandler=()=>{ //clunky way to retrieve backend data on RECEIPT, ITEMS and GroupMembers
        //retrieves receipt and item info
        console.log('SEND AND GET SOMETHING')
        var reactThis = this;
        var img_token = 'guQnFRzRY4MXMm6F'; // need to find a way to retrieve img token..... !!!!!!!*(****!!!)
        var receipt_id;
        var obj = {};
        // ws06oyvmcgCsdsNL
        // guQnFRzRY4MXMm6F

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
                this.viewReceiptHandler();
                this.doneViewingReceiptHandler();
                 // toggles condition to view receipt component

            })
        })
    }

    viewReceiptHandler =()=>{

        this.setState( {hasReceipt: true} );
    }

    doneViewingReceiptHandler = () =>{

        this.setState( {verifyReceipt: true} );
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
        // const proceedToItemSelection = this.state.verifyReceipt;

       return (
            <div>
                <Receipt receipt={this.state.receipt} pickMeUp={this.pickMeUp} updateReceipt={this.updateHandler}/>
                <WholeSummary summary={this.state.receipt}/>
                <a href="/takePhoto">Click here to take photo</a>
            </div>
    );
  }
}

Receipt.propTypes = {
    receipt: PropTypes.object,
    pickMeUp: PropTypes.func,
};

ItemTable.propTypes = {
    pickMeUp: PropTypes.func,
    items: PropTypes.array,
}

ItemRow.propTypes = {
    item: PropTypes.object,
    pickMeUp: PropTypes.func,
    type: PropTypes.string,
    id: PropTypes.number,
};

ItemElement.propType = {
    item: PropTypes.any,
    pickMeUp: PropTypes.func,
    type: PropTypes.string,
    id: PropTypes.number,
}

PaymentSummary.propTypes ={

    payment: PropTypes.object,
}

export default MainReceipt;