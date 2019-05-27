import React from 'react';

class TakePhoto extends React.Component {

    render() {
        return (
            <div>
            <form encType="multipart/form-data" method="post" action="/uploadPhoto">
                <input type="file" name="img" />
                <button type="submit">Upload</button>
            </form>
            <a href="/">Click here to view receipt</a>
            </div>
        )
    }
}

export default TakePhoto;