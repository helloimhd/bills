import React from 'react';

class TakePhoto extends React.Component {

    sendPhoto = e => {
        e.preventDefault();
        console.log(e);
    }

    render() {
        return (
            <form encType="multipart/form-data" method="post" action="/uploadPhoto">
                <input type="file" name="img" />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default TakePhoto;