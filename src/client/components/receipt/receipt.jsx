import React from 'react';

import PropTypes from 'prop-types';

// import styles from './style.scss';

class Receipt extends React.Component{
    constructor(){
        super();


    }  //end of constructor
    render(){
        return(
            <div>
                <p >Shows receipt based off JSON reply. User-main can edit individual items</p>
                <button onClick={()=>{this.props.getReceiptHandler()}}> Next </button>
            </div>
        );
    }
}
Receipt.propTypes = {
  getReceiptHandler: PropTypes.func,
};

export default Receipt;