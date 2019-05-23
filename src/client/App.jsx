import React from 'react';
import { hot } from 'react-hot-loader';

import Counter from './components/counter/counter';
import Form from './components/form/form';

import Receipt from './components/receipt/receipt';
import Selection from './components/itemSelection/item';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
        message: 'hello',
    }
  }

  stuff =(e)=>{
    console.log('fuck');
  }

  render() {
    return (
      <div>
        <Receipt/>
        <Selection/>
      </div>
    );
  }
}

export default hot(module)(App);