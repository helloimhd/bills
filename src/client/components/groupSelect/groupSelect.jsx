import React from 'react';
import Cookies from 'js-cookie';

import styles from './style.scss';

class GroupSelect extends React.Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this)
    this.enterHandler = this.enterHandler.bind(this)
    this.updateGroupHandler = this.updateGroupHandler.bind(this)
    this.checkerHandler = this.checkerHandler.bind(this)

    this.state = {
      users: [],
      search: "",
      tickedUsers: [],
      checked: false,
      receipt: null,
      searchToggle: false,
    }

  }

  getUsersHandler() {
    fetch(`/search/group`)
      .then(response => response.json())
      .then(response => this.setState({ users: response.users }))
  }

  // getReceiptHandler(){
  //     let id = Cookies.get('receiptId');
  //     fetch(`/receipt/${id}`)
  //     .then(response=>response.json())
  //     .then(response=>this.setState({receipt: response}));
  // }

  changeHandler(event) {
    this.setState({ search: event.target.value })
  }

  enterHandler(event) {

    let searchToggle = true;
    this.setState({ searchToggle: searchToggle })
    if (event.keyCode === 8) {
      this.setState({ searchToggle: !searchToggle })
    }
  }

  updateGroupHandler(event) {
    if (this.state.checked === false) {
      return
    } else {
      let receiptIdCreator = Cookies.get('userId');
      const users = this.state.users
      const ticked = []

      for (let index in users) {
        let user = users[index]

        if (user.checked === true) {
          ticked.push(user)
        }

        if (receiptIdCreator == user.id) { //creator of receipt
          ticked.push(user)
        }
      }


      this.setState({ tickedUsers: ticked }, function() {
        console.log('STATESSSSS', this.state.tickedUsers)
      })
    }
  }

  checkerHandler(event) {

    // let stateCheck = !this.state.checked;
    this.setState({ checked: true });
    const userId = event.target.value
    const checked = event.target.checked
    const users = this.state.users

    for (let index in users) {
      let user = users[index]

      if (user.id == userId) {
        user["checked"] = checked;
      }
    }

    this.setState({ users: users }, function() {
      this.updateGroupHandler(event);
    })
  }

  componentDidMount() {
    //   console.log('helo');
    this.getUsersHandler();
    // this.getReceiptHandler();
    this.setState({
      receipt: this.props.receipt,
    })
  }

  render() {
    if (this.state.receipt === null) {
      return <p>LOADING</p>
    } else {
      let searchToggle = this.state.searchToggle;
      let search = this.state.search.toLowerCase()
      let receiptIdCreator = Cookies.get('userId');
      let userList = this.state.users.filter(user => user.username.includes(search)).map((user, index) => {
        if (receiptIdCreator == user.id) {

          return (
            <li key={user.id}>
                  <input
                    readonly="readonly"
                    type="checkbox"
                    name="group"
                    value={user.id}
                    checked={!user.checked}
                    className={styles.cssCheckbox}
                    id={user.id}
                  />
                  <label
                    htmlFor={user.id}
                    className={styles.cssLabel}
                  >
                    {user.username}
                  </label>
                </li>
          )
        } else {
          return (
            <li key={user.id}>
                      <input
                        type="checkbox"
                        name="group"
                        value={user.id}
                        onChange={this.checkerHandler}
                        checked={user.checked}
                        className={styles.cssCheckbox}
                        id={user.id}
                      />

                      <label
                        htmlFor={user.id}
                        className={styles.cssLabel}
                      >
                        {user.username}
                      </label>
                    </li>
          )
        }
      })


      return (
        <React.Fragment>
                <div className={styles.header}>
                    <h1 className={styles.textCenter}>SEARCH</h1><br/>
                </div>

               <div style={{marginTop: 50 + "px"}}>
                  <input
                    type="text"
                    placeholder="Search for users.."
                    onChange={this.changeHandler}
                    onKeyDown={this.enterHandler}
                    value={this.state.search}
                  />

                    {searchToggle ?   (<ul>{userList}</ul> ): (<p></p>)}

                    <button onClick={()=>{this.props.previousButton(this.state.tickedUsers, 'users')}}>Previous</button>
                    <button onClick={()=>{this.props.nextButton(this.state.tickedUsers, 'users')}}>Next</button>
                </div>

                <div className={styles.footer}></div>
            </React.Fragment>
      );
    }
  }
}

export default GroupSelect;