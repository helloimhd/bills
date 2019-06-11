import React from 'react';

import Cookies from 'js-cookie';
import GroupSelect from '../groupSelect/groupSelect';
import Receipt from '../receipt/receipt';
import SplitItems from '../splitItems/splitItems';
import WholeSummary from '../wholeSummary/wholeSummary';
import IndividualSummary from '../individualSummary/individualSummary';

class Test extends React.Component {
    constructor() {
        super();
        this.prettyPrint = this.prettyPrint.bind(this);
        this.state = {
            obj: null,
            loaded: false,
            pageNum: 1
        };
    }

    componentDidMount() {
        this.dataReqHandler();
    }

    dataReqHandler = () => {
        console.log('Start the engine');
        let receiptId = Cookies.get('receiptId');

        fetch(`/massiveLoad/${receiptId}`)
            .then((response) => response.json())
            .then((response) => {
                // this.setState({ everything: response })
                // document.getElementById('writeHere').value = JSON.stringify(this.state.everything);
                console.log('i come back for you now', response);

                let obj = {
                    receipt_id: response.receiptId.id,
                    user_id: response.receiptId.user_id,
                    group_id: response.receiptId.group_id,
                    img_token: response.receiptId.img_token,
                    subtotal: response.receiptId.subtotal.toFixed(2),
                    serviceCharge: (response.receiptId.subtotal * 0.1).toFixed(2),
                    gst: (response.receiptId.subtotal * 0.07).toFixed(2),
                    total: (
                        response.receiptId.subtotal * 0.1 +
                        response.receiptId.subtotal * 0.07 +
                        response.receiptId.subtotal
                    ).toFixed(2),
                    items: response.items,
                    users: response.usersDetails,
                    group: response.groupMembers
                };

                this.setState({ obj: obj });

                this.setState({ loaded: true });
            });
    };

    prettyPrint() {
        var ugly = document.getElementById('writeHere').value;
        console.log(ugly);
        var obj = JSON.parse(ugly);
        var pretty = JSON.stringify(obj, undefined, 4);
        document.getElementById('writeHere').value = pretty;
    }

    updateReceiptRequest = () => {
        console.log('send request to update receipt');
        let receipt = this.state.receipt;
        let input = { obj: receipt };

        fetch(`/update/receipt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(input)
        }).then((res) => console.log('updated receipts'));
        // console.log(res.json())
    };

    changePageForward = (state, pageName = null) => {
        var number = this.state.pageNum;
        number++;
        console.log('PASSS BACK', state);
        if (pageName == null) {
            this.setState({
                pageNum: number,
                [pageName]: state
            });
        } else if (pageName == 'users') {
            // console.log("STETE INSDIE TEST", state)
            let duplicate = this.state.obj;
            // console.log(duplicate)
            duplicate.users = state;
            let array = []
            state.forEach((user) => {
                array.push({
                    receipt_id: this.state.obj.receipt_id,
                    friend_id: user.id,
                    amount: null,
                });
            })

            duplicate.group = array
            this.setState({
                    pageNum: number,
                    obj: duplicate
                },
                function() {
                    // console.log(this.state.obj.users)
                }
            );
        } else if (pageName == 'items') {
            // console.log("STETE INSDIE TEST", state)
            let duplicate = this.state.obj;
            // console.log(duplicate)
            duplicate.items = state;
            this.setState({
                    pageNum: number,
                    obj: duplicate
                },
                function() {
                    // console.log(this.state.obj.items)
                }
            );
        } else if (pageName == 'receipt') {
            this.setState({
                    pageNum: number,
                    obj: state
                },
                function() {
                    console.log('aftersetagainomg', this.state.obj);
                }
            );
        } else {
            this.setState({
                pageNum: number
            });
        }
    };

    changePageBack = (state, pageName = null) => {
        var number = this.state.pageNum;
        number--;
        console.log('PASSS BACK', state);
        if (pageName == null) {
            this.setState({
                pageNum: number,
                [pageName]: state
            });
        } else {
            this.setState({
                pageNum: number
            });
        }
    };

    homeHandler = () => {

        console.log('SAVE EVERYTHING NOWWW', this.state.obj);

        let input = this.state.obj;

        fetch(`/end`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(input),
        }).then(res => console.log('update EVERYTHINGGG'));
    }

    render() {
        let page;

        if (this.state.pageNum === 1 && this.state.loaded) {
            page = (
                <GroupSelect
          receipt={this.state.obj}
          users={this.state.obj.users}
          update={this.updateReceiptRequest}
          nextButton={this.changePageForward}
          previousButton={this.changePageBack}
        />
            );
        } else if (this.state.pageNum === 2 && this.state.loaded) {
            page = (
                <Receipt
          receipt={this.state.obj}
          update={this.updateReceiptRequest}
          nextButton={this.changePageForward}
          previousButton={this.changePageBack}
        />
            );
        } else if (this.state.pageNum == 3 && this.state.loaded) {
            page = (
                <SplitItems
          items={this.state.obj.items}
          users={this.state.obj.users}
          nextButton={this.changePageForward}
          previousButton={this.changePageBack}
        />
            );
        } else if (this.state.pageNum == 4 && this.state.loaded) {
            page = (
                <WholeSummary
          receipt={this.state.obj}
          receiptItems={this.state.obj.items}
          nextButton={this.changePageForward}
          previousButton={this.changePageBack}
        />
            );
        } else if (this.state.pageNum == 5 && this.state.loaded) {
            page = (
                <IndividualSummary
          items={this.state.obj.items}
          users={this.state.obj.users}
          receipt={this.state.obj}
          nextButton={this.changePageForward}
          previousButton={this.changePageBack}
          done={this.homeHandler}
        />
            );
        }
        return <div>{page}</div>;
    }
}

export default Test;