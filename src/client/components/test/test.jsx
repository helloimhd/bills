import React from 'react';

class Test extends React.Component {
    constructor(){
        super()
    }

    dataReqHandler=()=>{
        console.log('Start the engine');
        let receiptId = 1;

        fetch(`/massiveLoad/${receiptId}`)
        .then(response=>response.json())
        .then(response=>{

            console.log('i come back for you now', response)
        });
    }


    render() {
        return(
            <React.Fragment>
                <div><p>HELLO</p></div>
                <button onClick={()=>{this.dataReqHandler()}}>GET REQUEST</button>
            </React.Fragment>
        )
    }
}

export default Test;