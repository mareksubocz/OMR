import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
 
class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }


  render(){
    return (
        <DropzoneArea
            // onChange={this.props.handleChange(this.state.files)}
            onDrop={this.props.onDrop}
            onDelete={this.props.onDelete}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            filesLimit={1}
            maxFileSize={10 * 1024 * 1024}
        />
    )
  }
}
 
export default DropzoneAreaExample;
