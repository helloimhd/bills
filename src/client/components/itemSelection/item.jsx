import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

// What does this need?
// It needs to have all the 1) item data (price, quantity, name). 2) it needs to have group members data. (i.e receipt_id =1 ,  user-ids, usernames).

class IndividualMember extends React.Component{
    render(){
        return(
            <p>Member</p>
        );
    }
}

class GroupMembers extends React.Component{
    render(){
        return(
            <div>
                <IndividualMember/>
                <IndividualMember/>
                <IndividualMember/>
            </div>
        );
    }
}

class ItemDetail extends React.Component{
    render(){
        return(
            <p>## Item --- Strawberry Cake --- $15 </p>
        );
    }
}

class ButtonTab extends React.Component{
    render(){
        return(
            <React.Fragment>
                <button>Previous</button>
                <button>Next</button>
            </React.Fragment>
        );
    }
}

class ItemCard extends React.Component{

    render(){
        return(
            <React.Fragment>
                <ItemDetail/>
                <GroupMembers/>
                <ButtonTab/>
            </React.Fragment>
        );
    }
}

class ItemSelection extends React.Component{
    constructor(){
        super();
    }render(){
    //this component should keep track of how many items in the receipt
        return(
            <div className={styles.itemSelectionContainer}>
                <ItemCard/>
            </div>
        );
    }
}

export default ItemSelection;