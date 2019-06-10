import React from 'react';
//import { Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Receipt from './components/receipt/receipt';
//import MainReceipt from './components/receipt/receipt';
//import Selection from './components/itemSelection/item';
import GroupSelect from './components/groupSelect/groupSelect';

import Home from './components/home/home';

import TakePhoto from './components/receipt/takePhoto';

import Login from './components/user/login';
import Register from './components/user/register';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WholeSummary from './components/wholeSummary/wholeSummary';
import IndividualSummary from './components/individualSummary/individualSummary';
import Username from './components/individualSummary/usernameSummary';

import Guides from './components/pictureGuides/guides'
import SplitItems from './components/splitItems/splitItems'
import Test from './components/test/test';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    handlerMe = (stuff)=>{
        console.log('Grab values from child',stuff);
        this.setState({stuff: stuff});
    }

    render() {
        let isLoggedIn = false;
        //console.log(document.cookie);
        if (document.cookie !== "") {
            isLoggedIn = true
        }

        return (
            <Router>

                <Route path="/test" render={(props) => (
                  isLoggedIn ? (

                    <Test {...props} stuff={this.state.stuff} handle={this.handlerMe} />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/guides" exact render={() => (
                    <Guides />
                )} />

                <Route path="/" exact render={() => (

                  isLoggedIn ? (
                    <Home />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/register" render={() => (
                  isLoggedIn ? (
                    <Home />
                  ) : (
                    <Register />
                  )
                )} />

                <Route path="/login" render={() => (
                  isLoggedIn ? (
                    <Home />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/takePhoto" render={() => (
                  isLoggedIn ? (
                    <TakePhoto />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/receipt" render={() => (
                  isLoggedIn ? (
                    <Receipt />
                  ) : (
                    <Login />
                  )
                )} />


                <Route path="/splitTesting" render={() => (
                  isLoggedIn ? (
                    <SplitItems />
                  ) : (
                    <Login />
                  )
                )} />


                <Route path="/group" render={() => (
                  isLoggedIn ? (
                    <GroupSelect />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/wholeSummary" render={() => (
                  isLoggedIn ? (
                    <WholeSummary />
                  ) : (
                    <Login />
                  )
                )} />

                <Route path="/summaryReceipt" render={() => (
                  isLoggedIn ? (
                    <IndividualSummary />
                  ) : (
                    <Login />
                  )
                )} />

            </Router>
        );
    }
}

// <Route path="/" exact component={Receipt} />


export default hot(module)(Main);

/* <Route path="/userNames" component={Username} /> */