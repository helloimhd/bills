import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';
import TakePhoto from './components/receipt/takePhoto';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //     message: 'hello',
    // }
  }

  render() {
    return (
      /*<div>
        <Receipt/>
        <Selection/>
      </div> */

      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/takePhoto" component={TakePhoto} />

      </Router>
    );
  }
}

function Home() {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}



export default hot(module)(App);