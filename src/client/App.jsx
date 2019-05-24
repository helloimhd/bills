import React from 'react';
import { hot } from 'react-hot-loader';

// import Counter from './components/counter/counter';
// import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';
import WholeSummary from './components/wholeSummary/wholeSummary';


class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //     message: 'hello',
    // }
  }

  render() {
    return (
      <div>
        <Receipt/>
        <Selection/>
        <WholeSummary/>
      </div>
    );
  }
}

export default hot(module)(App);