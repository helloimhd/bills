/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPI) => {
    // `dbPI` is accessible within this function scope

    let getUsersDetails = ( dataIn, callback )=>{

        let idArr = dataIn;
        let startQuery =    "SELECT groups.friend_id, users. * from groups inner join users on (groups.friend_id = users.id) where users.id = ";
        let queryString = "";

        let query = dataIn.forEach((item)=>{

            let makeString = startQuery + item + "; ";
            queryString = queryString + makeString;
        })

        queryString = queryString + ";";

        dbPI.query( queryString, (err,r)=>{

            let callbackArr = [];

            let returnCallback = r.forEach((result)=>{
                callbackArr.push(result.rows);

            })
            callback(err, callbackArr);
        })
    }


    return {
        getUsersDetails,
    };
};