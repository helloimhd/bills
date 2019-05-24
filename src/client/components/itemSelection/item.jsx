import React from 'react';

// import PropTypes from 'prop-types';

// import styles from './style.scss';

class ItemSelection extends React.Component{
    constructor(){
        super();
    }render(){
        return(
            <div>
                <p>user-main chooses each item who takes a stake or not</p>
                <button onClick={()=>{this.props.handler()}}>press me </button>
            </div>
        );
    }
}

export default ItemSelection;