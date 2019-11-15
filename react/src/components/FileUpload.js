import React, { Component } from 'react'

class FileUpload extends Component {

    constructor(props){
        super(props);
        this.state = {
            image: ''
        }
    }

    onChange(e)
    {
        let files = e.target.files;
    }

    render() {
        return (
            <div className="centered">
            <div onSubmit={this.onFormSubmit}>
                <input type="file" name="file" onChange={(e)=>this.onChange(e)}/>
            </div>
            </div>
        )
    }
}
export default FileUpload