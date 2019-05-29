import React from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';

// Ok so some weird shit here, we have to this for every image we want to place in our app. So in the image tag, just apply it like a variable. For example, <img src={pic}/>. What a day to be alive.
import pic from '../../images/a.jpg';

import styles from './style.scss';

class Guides extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className={styles.absoluteCenter}>
                  <div className={styles.container}>
                    <ul>
                      <li className={styles.bodyTextBold}></li>
                      <li className={styles.bodyTextBold}></li>
                      <li className={styles.bodyTextBold}>Close</li>
                    </ul>
                    <br/>
                    <h1>Scan Accuracy</h1>
                    <div className={styles.line}></div>
                    <p>There are many factors that will affect how accurate the results you get from the scan are. The following guidelines will help you get the most out of it.</p>
                    <img className={styles.imgGuides} src={pic}/>
                    <div className={styles.line}></div>
                    <ul>
                      <li className={styles.bodyTextBold}>Back</li>
                      <li className={styles.bodyTextBold}>1/4</li>
                      <li className={styles.bodyTextBold}>Next</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.footer}></div>
            </React.Fragment>
        )
    }
}

export default Guides;