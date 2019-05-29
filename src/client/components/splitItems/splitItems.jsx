import React from 'react';
import Cookies from 'js-cookie';

import styles from './style.scss';

class SplitItems extends React.Component{
    constructor(){
        super();
        this.getAllItems = this.getAllItems.bind(this)
        this.checkerHandler = this.checkerHandler.bind(this)
        this.onNextClick = this.onNextClick.bind(this)
        this.onPreviousClick = this.onPreviousClick.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
        this.updateItems = this.updateItems.bind(this);

        this.state = {
          items: null,
          users: null,
          activeIndex: 0,
        }
    }
    // Cookies.get('receiptId')
    getAllItems(){
      let receiptId = Cookies.get('receiptId')
      fetch(`/items/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({items: response}))
    }

    getAllUsers(){
      let receiptId = Cookies.get('receiptId')
      fetch(`/group/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({users: response}))
    }

    checkerHandler(event){
      const itemId = event.target.parentNode.parentNode.id
      // console.log("ITEM ID", itemId)

      const userId = parseInt(event.target.value)
      // console.log("USER ID", userId)

      const checked = event.target.checked
      // console.log("CHECKED", checked)

      const users = this.state.users
      const items = this.state.items

      if (checked === true) {
        items[itemId].users_id.push(userId)
      } else if (checked === false) {
        items[itemId].users_id.forEach((user, index) => {
          if (items[itemId].users_id[index] == userId) {
            items[itemId].users_id.splice( index, 1);
          }
        })
      }

      this.setState({items: items})
    }

    componentDidMount(){
      console.log('mounting')
      this.getAllItems()
      this.getAllUsers()
    }

    onNextClick() {
      if (this.state.activeIndex < this.state.items.length-1) {
        this.setState({activeIndex: this.state.activeIndex + 1});
      } else {
        this.setState({activeIndex: 0})
      }
    }

    onPreviousClick() {
      if (this.state.activeIndex != 0) {
        this.setState({activeIndex: this.state.activeIndex - 1});
      } else {
        this.setState({activeIndex: this.state.items.length - 1})
      }
    }

    selectChangeHandler(event){
      let value = parseInt(event.target.value)
      this.setState({activeIndex: value})
    }

    updateItems(){

        let items = this.state.items;
        let input = {obj : items};
        console.log(input);
        fetch(`/update/items`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(input),
        }).then(res=>console.log('Updated items'));

    }

    render(){

      if (this.state.users === null) {
        return <p>loading</p>
      } else {

        let usersList = this.state.users.map((user, index) => {
          return(
              <li key={user.id}>
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={this.checkerHandler}
                /> {user.username}
              </li>
            )
        })

        let itemList = this.state.items.map((item, index) => {

          if (index === this.state.activeIndex) {
            return (
                <li key={index} id={index}
                    style={{display: "block"}}
                >
                  <h1>{item.item_name}</h1>
                  <h1>${item.price}</h1>
                  <ul id={index}>
                    {usersList}
                  </ul>
                  <button onClick={this.onPreviousClick}>Previous</button>
                  <button onClick={this.onNextClick}>Next</button>
                </li>
              )
          } else {
            return (
                <li key={index} id={index}
                    style={{display: "none"}}
                >
                  <h1>{item.item_name}</h1>
                  <h1>${item.price}</h1>
                  <ul id={index}>
                    {usersList}
                  </ul>
                  <button onClick={this.onNextClick}>Next</button>
                </li>
              )
          }
        })

      let options = this.state.items.map((item, index) => {
        return (
            <option value={index}>{item.item_name} {index}</option>
          )
      })

        return(
                <ul>
                  <li>
                    <select onChange={this.selectChangeHandler} value={this.state.activeIndex}>
                      {options}
                    </select>
                  </li>
                  {itemList}
                  <li>
                    <button onClick={this.updateItems}><a href="/wholeSummary">Done Splitting</a></button>
                    </li>
                </ul>
        );
    }
  }
}

export default SplitItems;