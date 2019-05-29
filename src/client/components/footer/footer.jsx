import React from 'react';

// Ok so some weird shit here, we have to this for every image we want to place in our app. So in the image tag, just apply it like a variable. For example, <img src={pic}/>. What a day to be alive.
import pic from '../../images/a.jpg';

import styles from './style.scss';

class Footer extends React.Component {

    render() {
        return(
            <React.Fragment>
                <div className={styles.footer}>
                  <ul>
                    <li><button onClick={this.testFunction}><h2>Split a Bill</h2></button></li>
                  </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default Guides;