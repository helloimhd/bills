import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Test2 extends React.Component {
  constructor() {
    super()
    this.prettyPrint = this.prettyPrint.bind(this)
    this.state = {
      state: null,
    }
  }

  prettyPrint() {
    var ugly = document.getElementById('writeHere').value;
    console.log(ugly)
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('writeHere').value = pretty;
  }

  componentDidMount () {
    // this.setState({state: this.props.location.state})
    console.log(this.props.location)
    document.getElementById('writeHere').value = this.state.potato;
  }

  render() {
    return (
      <React.Fragment>
                <div style={{'zIndex': 50,}}><p>HELLO</p>
                <button onClick={this.prettyPrint}>Pretty Print</button>
                <textarea id="writeHere" style={{'width': 1000 + 'px', 'height': 600 + 'px'}}></textarea>
                </div>
            </React.Fragment>
    )
  }
}

export default Test2;