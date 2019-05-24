import React from 'react';

class WholeSummary extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log('HELLO summary', this.props.summary);


            if(this.props.summary.length === 0){
                return (<div>
                <p></p>
                </div>)
            }else {
                return(<div>
                <h1>This will show the entire summary of the bill after user has assigned all items</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Item name</th>
                            <th>Price: {this.props.summary.items[0].price}</th>
                        </tr>
                        <tr>
                            <td>Steak</td>
                            <td>$$$</td>
                        </tr>
                        <tr>
                            <td>Burger</td>
                            <td>$$</td>
                        </tr>
                    </tbody>
                </table>
            </div>);
            }
    }
}

export default WholeSummary;