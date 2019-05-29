import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

// Ok so some weird shit here, we have to this for every image we want to place in our app. So in the image tag, just apply it like a variable. For example, <img src={pic}/>. What a day to be alive.
import pic from './a.jpg';
import Camera from './camera.png';


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

    testFunction = () => {
      window.location.href = "/takePhoto"
    }


    render() {
        if (!this.state.receipts){
            return <div></div>

        } else {

        let receipts = this.state.receipts;
        const currentUserId = Cookies.get('userId');
        let allReceipts = null;

        if (receipts.length === 0) {
          allReceipts = (
              <div className={styles.container}>
                <h2>No receipts yet :(</h2>
              </div>
            )
        } else {
          allReceipts = receipts.map(obj => {
            let ownBy = null;
            if (parseInt(obj.ownBy) === parseInt(currentUserId)) {
                ownBy = "YOU";
            } else {
                ownBy = obj.username;
            }

            // if null means user is involved in the receipt but not paying (for now)
              if (obj.sum !== null) {
                  return (
                      <div key={obj.receiptId} style={{borderBottom: 2+"px solid grey"}}>
                          <p>{moment(obj.date).format('D MMMM YYYY')}</p>
                          <p>Amount: {obj.sum}</p>
                          <p>Own By: {ownBy}</p>
                      </div>
                  )
              }
          })
        }

        return(
            <React.Fragment>

                <div className={styles.header}>
                  <h1 className={styles.textCenter}>HOME</h1><br/>
                </div>

                <div style={{marginTop: 40 + "px"}}>

                  <div className={styles.invisContainer}>
                    <div className={styles.spreadContainer}>
                      <button className={styles.button} onClick={this.sortByPrice}><h2>Sort By Price</h2></button>
                      <button className={styles.button} onClick={this.sortByDate}><h2>Sort By Date</h2></button>
                    </div>
                  </div>

                  {allReceipts}
                </div>

                <div className={styles.footer}>
                </div>

                <div className={styles.cameraButton}>
                  <button className={styles.roundedButton} onClick={this.testFunction}>
                      <img src={Camera} width="30"/>
                  </button>
                </div>

            </React.Fragment>
        )
    }}
}

export default Home;