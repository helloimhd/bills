import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

//import Login from '../user/login';
//import pic from './a.jpg';

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

    sortByPrice = () => {
        let receipts = this.state.receipts;

        receipts.sort(function(a, b) {
            return parseFloat(a.sum) - parseFloat(b.sum);
        });

        this.setState({receipts: receipts})
    }

    sortByDate = () => {
        let receipts = this.state.receipts;

        receipts.sort(function(a, b) {
            return Date.parse(a.date) - Date.parse(b.date);
        });

        this.setState({receipts: receipts})
    }


    render() {
        if (!this.state.receipts){
            return <div></div>

        } else {

        let receipts = this.state.receipts;
        const currentUserId = Cookies.get('userId');


        let allReceipts = receipts.map(obj => {
            let ownBy = null;
            if (parseInt(obj.ownBy) === parseInt(currentUserId)) {
                ownBy = "YOU";
            } else {
                ownBy = obj.username;
            }

            // if null means user is involved in the receipt but not paying (for now)
            if (obj.sum !== null) {
                return (
                    <div style={{borderBottom: 2+"px solid grey"}}>
                        <p>{moment(obj.date).format('D MMMM YYYY')}</p>
                        <p>Amount: {obj.sum}</p>
                        <p>Own By: {ownBy}</p>
                    </div>
                )
            }

        })

        return(
            <React.Fragment>
                <div>
                    <h1>HOME</h1>
                    <button type="button"><a href='/takePhoto'>Split a Bill</a></button>
                    <button type="button" onClick={this.sortByPrice}>Sort By Price</button>
                    <button type="button" onClick={this.sortByDate}>Sort By Date</button>
                    {allReceipts}
                </div>

            </React.Fragment>
        )
    }}
}

export default Home;