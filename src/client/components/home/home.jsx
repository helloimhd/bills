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
      // window.location.href = "/takePhoto"
      document.getElementById('file').click()
    }


    logout = () => {
        Cookies.remove('userId', { path: '' }); // removed!
        Cookies.remove('username', { path: '' }); // removed!
        Cookies.remove('receiptId', { path: '' }); // removed!
        window.location.href = "/login"
    }

    submitHandler = () => {
      document.getElementById("form").submit();
    }

    toReceipt = (e) => {
        console.log(e.target.parentNode.id)
        let receiptId = e.target.parentNode.id;
        Cookies.set('receiptId', receiptId, { path: '' });
        window.location.href = `/summaryReceipt`;
    }


    render() {
            let allReceipts = null;

            if (!this.state.receipts){
                return <div></div>
            } else {

              let receipts = this.state.receipts;
              const currentUserId = Cookies.get('userId');

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
                      ownBy = "You";
                  } else {
                      ownBy = obj.username;
                  }

            // if null means user is involved in the receipt but not paying (for now)
                  if (obj.sum !== 0) {
                      return (
                          <div key={obj.receiptId} className={styles.container} onClick={this.toReceipt} id={obj.receiptId}>
                            <div className={styles.flexContainer} id={obj.receiptId}>
                                <div className={styles.dateHeader}>
                                    <p>{moment(obj.date).format('D MMMM YYYY')}</p>
                                </div>
                                <div className={styles.infoContainer}>
                                    <p style={{textTransform: "capitalize"}}>By {ownBy}</p>
                                    <p>${(obj.sum).toFixed(2)}</p>
                                </div>
                            </div>
                          </div>
                      )
                  } else {
                    return (
                          <div key={obj.receiptId} className={styles.container}>
                            <div className={styles.flexContainer}>
                                <div className={styles.dateHeader}>
                                    <p>{moment(obj.date).format('D MMMM YYYY')}</p>
                                </div>
                                <div className={styles.infoContainer}>
                                    <p style={{textTransform: "capitalize"}}>By {ownBy}</p>
                                    <p>-</p>
                                </div>
                            </div>
                          </div>
                      )
                  }

                })
              }
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
                      <button className={styles.button} onClick={this.logout}><h2>Log Out</h2></button>
                    </div>
                  </div>

                  {allReceipts}
                </div>

                <div className={styles.footer}>
                </div>

                <div className={styles.cameraButton}>
                  <button className={styles.homeRoundedButton} onClick={this.testFunction}>
                        <div className={styles.icon}>
                            <div className={styles.camera2}>
                                <span></span>
                            </div>
                        </div>
                  </button>
                </div>

                <form id="form" className={styles.inputfile} encType="multipart/form-data" method="post" action="/uploadPhoto">
                    <input  id="file"
                            type="file"
                            name="img"
                            accept="image/*"
                            capture="camera"
                            onChange={this.submitHandler}/><br/>
                    <label for="file">Photo</label><br/>
                    <button type="submit">Upload</button>
                </form>

            </React.Fragment>
        )
  }
}

export default Home;