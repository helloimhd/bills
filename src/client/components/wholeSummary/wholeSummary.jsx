import React from 'react';
import Cookies from 'js-cookie';

import styles from './style.scss';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            receiptItems: {},
            change: false,
            getTotal: 0,
        }
    }

    receiptHandler() {

        var reactThis = this;
        console.log("clicking");
        var id = 1;
        // var id = Cookies.get('receiptId');
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
        console.log('check state', this.state.receiptItems);
        const receiptItems = this.state.change;

        if(!receiptItems){
        return (
            <div className={styles.absoluteCenterBigBoss}>
                <div className={styles.containerSmallBoss}>
                    <h1>Bill Summary</h1>
                    <button className={styles.driver} onClick={()=>{this.receiptHandler()}}>Show items</button>
                    <a className={styles.BusDriver} href="/summaryReceipt">Individual</a>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.absoluteCenterBigBoss}>
                <div className={styles.containerSmallBoss}>
                    <h1>Bill Summary</h1>
                    <div className={styles.lineManager}></div>
                    <table>
                      <tbody>
                          <tr>
                              <td className={styles.intern}>Receipt ID</td>
                              <td className={styles.intern}>Item Name</td>
                              <td className={styles.intern}>Price</td>
                          </tr>
                              {this.state.receiptItems.map((allItems, i) => {
                                let price = (allItems.price).toFixed(2)
                                    return (
                                      <tr className={styles.associate} key={i}>
                                          <td className={styles.trainee}>
                                          {allItems.receipt_id}
                                          </td>
                                          <td className={styles.trainee}>
                                          {allItems.item_name}
                                          </td>
                                          <td className={styles.trainee}>
                                          {price}
                                          </td>
                                      </tr>
                                    )}
                                )}
                          <tr>
                              <td className={styles.intern}>Total</td>
                              <td></td>
                              <td className={styles.intern}>{(this.state.getTotal).toFixed(2)}</td>
                          </tr>
                      </tbody>
                    </table>
                    <br />
                    <a className={styles.cleaner} href="/summaryReceipt">Individual</a>
                </div>
            </div>
            )
        }
    }
}

export default WholeSummary;