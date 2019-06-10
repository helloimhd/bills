import React from 'react';

class Test extends React.Component {
  constructor() {
    super()
    this.prettyPrint = this.prettyPrint.bind(this)
    this.state = {

    }
  }

  dataReqHandler = () => {
    console.log('Start the engine');
    let receiptId = 1;

    fetch(`/massiveLoad/${receiptId}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ everything: response })
        document.getElementById('writeHere').value = JSON.stringify(this.state.everything);
        console.log('i come back for you now', response)
      });
  }

  prettyPrint() {
    var ugly = document.getElementById('writeHere').value;
    console.log(ugly)
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('writeHere').value = pretty;
  }


  render() {
    return (
      <React.Fragment>
                <div><p>HELLO</p></div>
                <button onClick={()=>{this.dataReqHandler()}}>GET REQUEST</button>
                <button onClick={this.prettyPrint}>Pretty Print</button>
                <textarea id="writeHere" style={{'width': 1000 + 'px', 'height': 600 + 'px'}}></textarea>

            </React.Fragment>
    )
  }
}

export default Test;