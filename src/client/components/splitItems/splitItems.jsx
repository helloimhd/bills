import React from 'react';

import styles from './style.scss';

class SplitItems extends React.Component{
    constructor(){
        super();
        this.getAllItems = this.getAllItems.bind(this)
        this.checkerHandler = this.checkerHandler.bind(this)

        this.state = {
          items: [],
          users: [],
        }
    }

    getAllItems(){
      let receiptId = 1;
      console.log('hello')
      fetch(`/items/${receiptId}`)
        .then(response=>response.json())
        .then(response=>this.setState({items: response}))
    }

    getAllUsers(){
      let receiptId = 1;
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


    render(){

      let usersList = this.state.users.map((user, index) => {
        return(
            <li key={user.friend_id}>
              <input
                type="checkbox"
                value={user.friend_id}
                onChange={this.checkerHandler}
              /> {user.friend_id}
            </li>
          )
      })

      let itemList = this.state.items.map((item, index) => {
        return (
            <li key={index}>
              <h1>{item.item_name}</h1>
              <h1>${item.price}</h1>
              <ul id={index}>
                {usersList}
              </ul>
            </li>
          )
      })
        return(
                <ul>
                  {itemList}
                </ul>
        );
    }
}

export default SplitItems;