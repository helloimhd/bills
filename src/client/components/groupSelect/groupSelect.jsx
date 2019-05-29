import React from 'react';
import Cookies from 'js-cookie';

//import styles from './style.scss';

class GroupSelect extends React.Component {
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this)
        this.enterHandler = this.enterHandler.bind(this)
        this.updateGroupHandler = this.updateGroupHandler.bind(this)
        this.getUsersHandler = this.getUsersHandler.bind(this)
        this.checkerHandler = this.checkerHandler.bind(this)

        this.state = {
          users: [],
          search: "",
          tickedUsers: [],
          checked: false,
          receipt:null,
        }

    }

    getUsersHandler(){
      fetch(`/search/group`)
        .then(response=>response.json())
        .then(response=>this.setState({users: response.users}))
    }

    getReceiptHandler(){
        let id = Cookies.get('receiptId');
        fetch(`/receipt/${id}`)
        .then(response=>response.json())
        .then(response=>this.setState({receipt: response}))
    }

    changeHandler(event){
      this.setState({search: event.target.value})
    }

    enterHandler(event){
      if (event.keyCode === 13) {

      }
    }

    updateGroupHandler(event){
        if (this.state.checked === false) {
            return
        } else  {
            console.log('helloo SEND TO BACK END');
            // console.log(this.state.users);
            // console.log(this.state.tickedUsers);
            // console.log(this.state.users)

            const checked = event.target.checked
            const users = this.state.users
            const ticked = []

            for (let index in users) {
                let user = users[index]
                if(user.checked === true) {
                  // console.log(user.id)
                  // console.log(user.checked)
                  // console.log(user)
                    ticked.push(user)
                    this.setState({tickedUsers: ticked})
                }
            }
            console.log(ticked)

            let idInGroup = [];
            ticked.forEach((r)=>{
                idInGroup.push(r.id);
            })
           // Cookies.get('receiptId')

            let receiptId = Cookies.get('receiptId');

            let input = {
                        obj : idInGroup,
                        receipt_id : receiptId,
                        };

            fetch(`/selected/group`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(input),
            }).then(res=>console.log(res.json()));

            window.location.href = "/receipt";
        }
      }

    checkerHandler(event){

        // let stateCheck = !this.state.checked;
        this.setState({checked: true});
        const userId = event.target.value
        const checked = event.target.checked
        const users = this.state.users

        for (let index in users){
            let user = users[index]

            if(user.id==userId){
                user["checked"] = checked;
            }
        }

        this.setState({users:users})
    }

    componentDidMount(){
        console.log('helo');
      this.getUsersHandler();
      this.getReceiptHandler();
    }

    render(){
        if(this.state.receipt === null){
            return <p>LOADING</p>
        } else {
        let search = this.state.search.toLowerCase()
        let receiptId = this.state.receipt[0].user_id;
        let userList = this.state.users.filter(user => user.username.includes(search)).map((user, index) => {
            if(receiptId === user.id){

                return (
                <li key={user.id}>
                  <input
                    type="checkbox"
                    name="group"
                    value={user.id}
                    onChange={this.checkerHandler}
                    defaultChecked={!user.checked}
                    checked={user.checked}
                    /> {user.username}
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
                        /> {user.username}
                    </li>
                )
            }
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

                <button onClick={(e)=>{this.updateGroupHandler(e)}} type="button">View receipt</button>
            </div>
          );
        }
    }
}

export default GroupSelect;