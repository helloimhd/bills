import React from 'react';

import styles from './style.scss';

class GroupSelect extends React.Component{
    constructor(){
        super();
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.enterHandler = this.enterHandler.bind(this)
        this.updateGroupHandler = this.updateGroupHandler.bind(this)

        this.state = {
          users: [],
          search: "",
        }

    }

    submitHandler(event){
      let query = this.state.search

      fetch(`/group/search?search=${query}`)
        .then(response=>response.json()
        .then(response=>this.setState({users: response.users})
          )
        )
    }

    changeHandler(event){
      this.setState({search: event.target.value})
    }

    enterHandler(event){
      // console.log(event.keyCode)
      if (event.keyCode === 13) {
        this.submitHandler();
      }
    }


    render(){

      let userList = this.state.users.map((user, index) => {
        return (
          <li key={index}>
            <input type="checkbox" name="group" value={index}/> {user.username}
          </li>
          )
      })

        return(

            <div>

              <input
                placeholder="Search for users.."
                onChange={this.changeHandler}
                onKeyDown={this.enterHandler}
                value={this.state.search}
              />


              <ul>
                {userList}
              </ul>


              <button
                > connect this button to next page </button>
            </div>
        );
    }
}

export default GroupSelect;