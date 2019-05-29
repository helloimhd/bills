import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

import Login from '../user/login';

// Ok so some weird shit here, we have to this for every image we want to place in our app. So in the image tag, just apply it like a variable. For example, <img src={pic}/>. What a day to be alive.
import pic from './a.jpg';


import styles from './style.scss';

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

    testFunction = () => {
      window.location.href = "/takePhoto"
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
                    <button type="button" onClick={this.testFunction}><h2>Split a Bill</h2></button>
                    {allReceipts}
                </div>
                <br/> <br/> <br/>
                <span className={styles.bodyTextBold}>This is for testing styles, chill bruh</span>

                <div className={styles.absoluteCenter}>
                  <div className={styles.container}>
                    <ul>
                      <li className={styles.bodyTextBold}></li>
                      <li className={styles.bodyTextBold}></li>
                      <li className={styles.bodyTextBold}>Close</li>
                    </ul>
                    <br/>
                    <h1>scan accuracy</h1>
                    <div className={styles.line}></div>
                    <p>There are many factors that will affect how accurate the results you get from the scan are. The following guidelines will help you get the most out of it.</p>
                    <img src={pic}/>
                    <div className={styles.line}></div>
                    <ul>
                      <li className={styles.bodyTextBold}>Back</li>
                      <li className={styles.bodyTextBold}>1/4</li>
                      <li className={styles.bodyTextBold}>Next</li>
                    </ul>
                  </div>
                </div>
            </React.Fragment>
        )
    }}
}

export default Home;