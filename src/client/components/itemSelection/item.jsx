import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

// What does this need?
// It needs to have all the 1) item data (price, quantity, name). 2) it needs to have group members data. (i.e receipt_id =1 ,  user-ids, usernames).

class IndividualMember extends React.Component{
    constructor(){
        super();
        this.state={
            checked:false,
        }
    }

    blah = (e)=>{

        this.setState( {checked: !this.state.checked} );

        this.checker(!this.state.checked,e.target.value);
    }

    checker=(status,id)=>{

        if(status){
            console.log('THIS GUY NEEDS TO PAY!!!!', status);
        }else{
            console.log('Nope... not him...', id)
        }
    }
    render(){
        return(
            <React.Fragment>
                <input
                    type="checkbox"
                    value={this.props.member[0].id}
                    ref="input"
                    onChange={(e)=>{this.blah(e)}}
                    checked={this.state.checked}/>{this.props.member[0].username}<br/>
            </React.Fragment>

        );
    }
}

class GroupMembers extends React.Component{
    render(){
        const members = [];
        this.props.group.forEach((item,index)=>{
                members.push(
                    <IndividualMember
                        member={item}
                        key={index}/>
                )
        })
        return(
            <React.Fragment>
                {members}
            </React.Fragment>
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
                <ItemDetail items={this.props.items}/>
                <GroupMembers group={this.props.group}/>
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
                <ItemCard items={this.props.items} group={this.props.group}/>
            </div>
        );
    }
}

export default ItemSelection;