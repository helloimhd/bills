//what i need to do
// on first receipt page.... (herda)
// 1. create component to take in receipt and items data
// 2. render it out
// 3. items list must be able to edit
// 4. price listed on the items must add up to subtotal.
// 5. any changes done on item name and price will update at the final submit

// on items page (what i need....)
// 1. component needs items & group members
// 2. each component have an item with price, and have checkboxes to allow indication of who is sharing
// 3. every next will either store or update items tables
// 4. once at the end of items list, transit to summary receipt page

import React from 'react';

class Test extends React.Component{
    constructor(){
        super();
    }

    getJson = () =>{
        console.log('get json from tabscanner bitch ')
    }
    render(){
        return(
            <div>
                <p>Get json from tabscanner</p>
                <button onClick={()=>{this.getJson()}}>GET STUFF</button>
            </div>
        );
    }
}

export default Test;