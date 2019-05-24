import React from 'react';

import PropTypes from 'prop-types';

// import styles from './style.scss';
class ItemRow extends React.Component{
    constructor(){
        super();
    }

    testHandler=()=>{
        console.log('fuckkkkk');
    }
    render(){
        const item = this.props.item;
        console.log(item);
        // const name = product.stocked ?  product.name :
        //                                 <span style={{color: 'red'}}> {product.name} </span>;
        return(
            <tr onClick={()=>{this.testHandler()}}>
                <td>X {item.quantity}</td>
                <td>{item.item_name}</td>
                <td>$ {(item.price).toFixed(2)}</td>
            </tr>
        );
    }
}

class ItemTable extends React.Component{
    render(){
        const rows = [];

        this.props.items.forEach((item)=>{
            rows.push(
                <ItemRow
                    item={item}
                    key={item.item_name}/>)
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
                    <ItemTable items={this.props.receipt.items}/>
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