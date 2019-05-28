// import React from 'react';

// export class Username extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: {},
//             change: false,
//             total:0,
//         }
//     }

//     componentDidMount(){

//         this.usernameHandler();
//     }


//     usernameHandler() {

//         var reactThis = this;
//         // console.log("clicking");
//         var id = 1;
//         fetch(`/foobar/${id}`, {

//         }).then(res => {
//             return res.json()
//         }).then(json =>{
//             // console.log('in the jsx summary', json);
//             let obj = json;
//             this.setState({username: obj});
//             this.setState({change: true});
//             // console.log(this.state.username);
//             // console.log(this.state.change);
//         })
//     }

//     render() {
//         // console.log('check state', this.state.username);
//         const username = this.state.change;

//             return (
//                 <div>
//                   {this.state.username.map((user, i) => {
//                         return (
//                           <h1 key={i}>
//                               {user.username}'s Bill Summary
//                           </h1>
//                         )}
//                     )}
//                 </div>
//         )
//     }
// }

// export default Username;