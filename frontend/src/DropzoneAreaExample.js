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
            onDrop={this.props.handleChange}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            filesLimit={1}
        />
    )
  }
}
 
export default DropzoneAreaExample;
