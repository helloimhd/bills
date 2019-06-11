import React from 'react';
import Cookies from 'js-cookie';

import styles from './style.scss';

class SplitItems extends React.Component {
  constructor() {
    super();
    this.checkerHandler = this.checkerHandler.bind(this)
    this.onNextClick = this.onNextClick.bind(this)
    this.onPreviousClick = this.onPreviousClick.bind(this)
    this.selectChangeHandler = this.selectChangeHandler.bind(this)

    this.state = {
      items: null,
      users: null,
      activeIndex: 0,
    }
  }

  checkerHandler(event) {
    const itemId = event.target.parentNode.parentNode.id
    const userId = parseInt(event.target.value)
    const checked = event.target.checked

    const users = this.state.users
    const items = this.state.items

    if (checked === true) {
      items[itemId].users_id.push(userId)
    } else if (checked === false) {
      items[itemId].users_id.forEach((user, index) => {
        if (items[itemId].users_id[index] == userId) {
          items[itemId].users_id.splice(index, 1);
        }
      })
    }

    this.setState({ items: items })
  }

  componentDidMount() {
    this.setState({
      items: this.props.items,
      users: this.props.users,
    })
  }

  onNextClick() {
    if (this.state.activeIndex < this.state.items.length - 1) {
      this.setState({ activeIndex: this.state.activeIndex + 1 });
    } else {
      this.setState({ activeIndex: 0 })
    }
  }

  onPreviousClick() {
    if (this.state.activeIndex != 0) {
      this.setState({ activeIndex: this.state.activeIndex - 1 });
    } else {
      this.setState({ activeIndex: this.state.items.length - 1 })
    }
  }

  selectChangeHandler(event) {
    let value = parseInt(event.target.value)
    this.setState({ activeIndex: value })
  }

  render() {

    if (this.state.users === null) {
      return <p>loading</p>
    } else {

      let itemList = this.state.items.map((item, itemIndex) => {

        let usersList = this.state.users.map((user, userIndex) => {
          if (item.users_id.includes(user.id)) {
            return (
              <li key={user.id}>
                  <input
                    className={styles.cssCheckbox}
                    type="checkbox"
                    value={user.id}
                    onChange={this.checkerHandler}
                    id={user.id + "-" + item.id}
                    checked
                  />
                  <label
                    htmlFor={user.id + "-" + item.id}
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
                    className={styles.cssCheckbox}
                    type="checkbox"
                    value={user.id}
                    onChange={this.checkerHandler}
                    id={user.id + "-" + item.id}
                  />
                  <label
                    htmlFor={user.id + "-" + item.id}
                    className={styles.cssLabel}
                  >
                    {user.username}
                  </label>
                </li>
            )
          }
        })

        if (itemIndex === this.state.activeIndex) {
          return (
            <li key={itemIndex} id={itemIndex}
                    style={{display: "block"}}
                >
                  <h2>{item.item_name}</h2>
                  <h2>${item.price}</h2>
                  <ul id={itemIndex}>
                    {usersList}
                  </ul><br/><br/>
                  <button onClick={this.onPreviousClick}>Previous item</button>
                  <button onClick={this.onNextClick}>Next item</button>
                </li>
          )
        } else {
          return (
            <li key={itemIndex} id={itemIndex}
                    style={{display: "none"}}
                >
                  <h1>{item.item_name}</h1>
                  <h1>${item.price}</h1>
                  <ul id={itemIndex}>
                    {usersList}
                  </ul>
                  <button onClick={this.onNextClick}>Next</button>
                </li>
          )
        }
      })

      let options = this.state.items.map((item, index) => {
        return (
          <option value={index}>{item.item_name}</option>
        )
      })

      return (
        <React.Fragment>
                <div className={styles.header}>
                  <h1 className={styles.textCenter}>Split</h1><br/>
                </div>
                <div style={{marginTop: 80 + "px"}} >
                    <ul>
                      <li>
                        <select onChange={this.selectChangeHandler} value={this.state.activeIndex}>
                          {options}
                        </select>
                      </li>
                    </ul>


                    <ul>
                      {itemList}
                </ul>
                </div>

                <div className={styles.footer}></div>
                    <button onClick={()=>{this.props.previousButton(this.state.items)}}>Back</button>
                    <button onClick={()=>{this.props.nextButton(this.state.items, 'items')}}>Next</button>
                </React.Fragment>
      );
    }
  }
}

export default SplitItems;