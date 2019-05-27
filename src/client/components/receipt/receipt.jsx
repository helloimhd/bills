import React from 'react';

import PropTypes from 'prop-types';

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
                <button>Yes</button>
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
                    <ButtonProceedTab/>
                </div>
            )
        }
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

export default Receipt;