import React from 'react';

// import PropTypes from 'prop-types';

// import styles from './style.scss';

class Receipt extends React.Component{
    constructor(){
        super();
    }render(){
        return(
            <div>
                <p>Shows receipt based off JSON reply. User-main can edit individual items</p>
            </div>
        );
    }
}

export default Receipt;