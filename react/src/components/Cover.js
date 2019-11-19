import React, { Component } from 'react'
import BgImage from "./../scenebg.jpg"

class Cover extends Component {
    dropRef = React.createRef()

    state = {
        dragging: false
    }

    render() {
        return (

            <div>
                <div className="ImagePreviewX">
                    <div style={{ backgroundImage: `url(${BgImage})` }} />
                </div>
                <div className="centeredfull">
                    <h1>Practical CNN Object Detection</h1>
                </div>
                <div className="author">
                    <p className="teamStyle">Team 07</p>
                </div>
            </div>
        )
    }
}
export default Cover