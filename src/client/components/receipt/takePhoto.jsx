import React from 'react';

import styles from './style.scss';

class TakePhoto extends React.Component {

    render() {
        return (
            <div>
            <form encType="multipart/form-data" method="post" action="/uploadPhoto">
                <input type="file" name="img" accept="image/*" capture="camera"/><br/>
                <label for="file">oi</label><br/>
                <button type="submit">Upload</button>
            </form>
            </div>
        )
    }
}

export default TakePhoto;