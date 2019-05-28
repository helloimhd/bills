import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom'
import Login from '../user/login';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            // array of obj, receipt id, date, sum amount
            receipts: []
        }
    }

    componentDidMount() {
        this.getUserReceipts();
    }


    // fetch the data
    getUserReceipts = () => {
        console.log("entered get user receipts")
        fetch('/getUserReceipts')
        .then(response => {
            console.log("entered first then")
            return response.json();
        })
        .then(response => {
            console.log(response)
            this.setState({receipts: response});
        })
    }


    render() {
        let receipts = this.state.receipts;
       // console.log(receipts)

        let allReceipts = receipts.map(obj => {
            // if null means user is involved in the receipt but not paying (for now)
            if (obj.sum !== null) {
                return (
                    <div>
                        <p>{moment(obj.date).format('D MMMM YYYY')}</p>
                        <p>{obj.sum}</p>
                    </div>
                )
            }

        })
        return(
            <React.Fragment>
                <div>
                    <h1>HOME</h1>
                    <button type="button"><a href='/takePhoto'>Split a Bill</a></button>
                    {allReceipts}
                </div>
            </React.Fragment>
        )
    }
}

export default Home;