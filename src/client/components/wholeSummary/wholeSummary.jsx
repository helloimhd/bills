import React from 'react';
import Cookies from 'js-cookie';

import styles from './style.scss';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: null,
            receipt: null,
            total:0,
            getTotal: null,
        }
    }

    componentDidMount(){
        console.log('HELLO MOUNT WHOLE SUMMARY')
        this.getAllItemsHandler();
        this.getReceiptHandler();
    }

    getReceiptHandler(){

        let receiptId = Cookies.get('receiptId');
        fetch(`/receipt/${receiptId}`)
          .then(response=>response.json())
          .then(response=>this.setState({receipt: response}))
    }


    getAllItemsHandler() {

        var reactThis = this;
        console.log("clicking");
        var id = Cookies.get('receiptId');
        fetch(`/summary/${id}`, {

        }).then(res => {
            return res.json()
        }).then(json =>{
            // console.log('in the jsx summary', json);
            let obj = json;
            this.setState({receiptItems: obj});
            this.setState({change: true});

            // Add the price of items together to get the total amount
            let getTotal = 0;

            for (let allPrices in obj) {
                const addAllPrices = obj[allPrices].price
                console.log(addAllPrices)
                getTotal += addAllPrices;
            }

            this.setState({getTotal: getTotal})

            // console.log(this.state.receiptItems);
            // console.log(this.state.change);
        })
    }

    render() {
       if( this.state.receiptItems === null || this.state.receipt === null || this.state.getTotal === null ){
            return <p>LOADING</p>
        } else {
        return (
            <div className={styles.absoluteCenterBigBoss}>
                <div className={styles.containerSmallBoss}>
                    <h1 className= {styles.billSum}>Bill Summary</h1>
                    <div className={styles.lineManager}></div>
                    <table>
                      <tbody>
                          <tr>
                              <td className={styles.intern}>Item Name</td>
                              <td></td>
                              <td className={styles.intern}>Price</td>
                          </tr>
                              {this.state.receiptItems.map((allItems, i) => {
                                let price = (allItems.price).toFixed(2)
                                    return (
                                      <tr className={styles.associate} key={i}>
                                          <td className={styles.trainee}>
                                          {allItems.item_name}
                                          </td>
                                          <td className={styles.intern}></td>
                                          <td className={styles.trainee}>
                                          {price}
                                          </td>
                                      </tr>
                                    )}
                                )}
                          <tr>
                              <td className={styles.intern}>Sub Total $ </td>
                              <td></td>
                              <td className={styles.intern}>{(this.state.getTotal).toFixed(2)}</td>
                          </tr>
                          <br/>
                          <br/>
                          <tr>
                              <td className={styles.intern}>Grand Total $</td>
                              <td></td>
                              <td className={styles.intern}>{this.state.receipt[0].total}</td>
                          </tr>
                      </tbody>
                    </table>
                    <br />
                    <a className={styles.cleaner} href="/summaryReceipt">Next Page (Individual)</a>
               </div>
            </div>
            )
        }
    }
}

export default WholeSummary;