import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

// What does this need?
// It needs to have all the 1) item data (price, quantity, name). 2) it needs to have group members data. (i.e receipt_id =1 ,  user-ids, usernames).

class IndividualMember extends React.Component{
    constructor(){
        super();
    }

    checkBoxHandler = (e)=>{

        this.props.takeStatus(e.target.id);
    }

    // checker=(status,id)=>{

    //     if(status){
    //         console.log('THIS GUY NEEDS TO PAY!!!!', id , status);
    //     }else{
    //         console.log('Nope... not him...', id, status)
    //     }
    // }

    render(){

        return(
            <React.Fragment>
                <input
                    type="checkbox"
                    value={this.props.member[0].username}
                    id={this.props.member[0].id}
                    ref="input"
                    onChange={(e)=>{this.checkBoxHandler(e)}}
                    checked={this.props.status}
                    />{this.props.member[0].username}<br/>{this.props.currentItem.item_name}<br/>
            </React.Fragment>
        );
    }
}

class ItemDetail extends React.Component{
    constructor(){
        super()
    }

    takeStatusFromChild=(id)=>{
        console.log('yea gon live up', id);

    }

    render(){
        const members = [];

        console.log('start',this.props)



        this.props.item.group.forEach((item,index)=>{


                members.push(
                    <IndividualMember
                        currentItem={this.props.item}
                        member={item}
                        key={index}
                        checked={status}
                        takeStatus={this.takeStatusFromChild}/>
                )
        })
        return(
            <React.Fragment>
                <p>Qty:{this.props.item.quantity}  {this.props.item.item_name} ${this.props.item.price}</p>
                {members}
            </React.Fragment>
        );
    }
}

// <GroupMembers group={this.props.group}/>

class ButtonTab extends React.Component{
    render(){
        return(
            <React.Fragment>
                <button onClick={()=>{this.props.previousHandler()}}>Previous</button>
                <button onClick={()=>{this.props.nextHandler()}}>Next</button>
            </React.Fragment>
        );
    }
}

class ItemCard extends React.Component{

    render(){
        const items = this.props.items;
        const numberNow = this.props.itemNumberNow;

        let giveItemNow = items[numberNow];
        // console.log(giveItemNow);
        return(
            <React.Fragment>
                <ItemDetail item={giveItemNow} number={numberNow}/>
            </React.Fragment>
        );
    }
}

class ItemSelection extends React.Component{
    constructor(){
        super();
        this.state = {
            counter:0,
        }
    }

    nextHandler=()=>{

        if(this.state.counter !== this.props.items.length-1){
            let counterNow = this.state.counter + 1;

            this.setState({counter:counterNow});
        }
    }

    previousHandler =()=>{

        if(this.state.counter > 0){
            let counterNow = this.state.counter - 1;

            this.setState({counter:counterNow});
        }
    }
    render(){
        //this component should keep track of how many items in the receipt
        this.props.items.forEach((item,index)=>{
            item.group = this.props.group;
        })
        return(
            <div className={styles.itemSelectionContainer}>
                <ItemCard items={this.props.items} itemNumberNow={this.state.counter}/>
                <ButtonTab nextHandler={this.nextHandler} previousHandler={this.previousHandler}/>
            </div>
        );
    }
}

export default ItemSelection;