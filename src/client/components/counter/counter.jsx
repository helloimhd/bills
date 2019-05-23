import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';
import main_styles from '../../style.scss';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      banana: 'sneakers',
      counters : []
    };
      this.handleClick = this.handleClick.bind(this);
  }

    handleClick(){
        let num = Math.random();

        const newArray = [num, ...this.state.counters];

        this.setState({ counters : newArray });
    }

  render() {
    return (
      <div>
          <button onClick={this.handleClick}>click me</button>
          <p className={styles.desc}>
            {this.props.message} : {this.state.banana}
          </p>
          {this.state.counters.map((counter)=>{ return <p>{counter}</p>})}
      </div>
    );
  }
}

Counter.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Counter;