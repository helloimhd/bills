import React from 'react';

class WholeSummary extends React.Component {
    constructor() {
        super();
        this.state = {
            stuff: {},
            change: false,
        }
    }

    receiptHandler() {

        var reactThis = this;
        console.log("clicking");
        var id = 1;
        fetch(`/summary/${id}`, {

        }).then(res => {
            return res.json()
        }).then(json =>{
            // console.log('in the jsx summary', json);
            let obj = json;
            this.setState({stuff: obj});
            this.setState({change: true});
            // console.log(this.state.stuff);
            // console.log(this.state.change);
        })
    }

    render() {
        console.log('check state', this.state.stuff);
        const stuff = this.state.change;


        if(!stuff){
        return (
            <div>
                <h1>This will show the entire summary of the bill after user has assigned all items</h1>
                <button onClick={()=>{this.receiptHandler()}}>YAY</button>
            </div>
        );
    } else {
        return (
            <div>
            <table>
                    <tbody>
                        <tr>
                            <th>Item name</th>
                            <th>Price</th>
                        </tr>
                        <tr>
                            <td>{this.state.stuff[0].item_name}</td>
                            <td>{this.state.stuff[0].price}</td>
                        </tr>
                        <tr>
                            <td>Burger</td>
                            <td>$$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )
        }
    }
}

export default WholeSummary;