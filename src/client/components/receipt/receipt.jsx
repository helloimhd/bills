import React from 'react';

import PropTypes from 'prop-types';

// import styles from './style.scss';

class ItemRow extends React.Component{

    renderEditView =(item)=>{
        return <tr>
            <td>
                <input type="text" defaultValue={item.quantity} />
                <button onClick={()=>{this.props.editItemHandler()}}>☑️</button>
                <button onClick={()=>{this.props.updateItemHandler()}}>OK</button>
            </td>
            <td>
                <input type="text" defaultValue={item.item_name}/>
                <button onClick={()=>{this.props.editItemHandler()}}>☑️</button>
                <button onClick={()=>{this.props.updateItemHandler()}}>OK</button>
            </td>
            <td>
                <input type="text" defaultValue={(item.price).toFixed(2)}xx />
                <button onClick={()=>{this.props.editItemHandler()}}>☑️</button>
                <button onClick={()=>{this.props.updateItemHandler()}}>OK</button>
            </td>
        </tr>
    }

    renderDefaultView = (item)=>{
        return <tr>
            <td onClick={(e)=>{this.props.editItemHandler(e)}}>{item.quantity} X</td>
            <td onClick={(e)=>{this.props.editItemHandler(e)}}>{item.item_name}</td>
            <td onClick={(e)=>{this.props.editItemHandler(e)}}>$ {(item.price).toFixed(2)}</td>
        </tr>
    }

    render(){
        const item = this.props.item;
        const editState = this.props.editState;
        console.log(item);
        console.log(this.props.editState);
        // const name = product.stocked ?  product.name :
        //                                 <span style={{color: 'red'}}> {product.name} </span>;
        return editState ?
        this.renderEditView(item) : this.renderDefaultView(item)

    }
}

class ItemTable extends React.Component{
    render(){
        const rows = [];

        this.props.items.forEach((item)=>{
            rows.push(
                <ItemRow
                    item={item}
                    key={item.item_name}
                    editItemHandler={this.props.editItemHandler}
                    editState={this.props.editState}
                    updateItemHandler={this.props.updateItemHandler}/>
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

class ButtonTab extends React.Component{
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
                    <ItemTable items={this.props.receipt.items} editItemHandler={this.props.editItemHandler} editState={this.props.editState} updateItemHandler={this.props.updateItemHandler}/>
                    <PaymentSummary payment={this.props.receipt}/>
                    <ButtonTab/>
                </div>
            )
        }
    }
}
Receipt.propTypes = {
  receipt: PropTypes.array,
};

export default Receipt;