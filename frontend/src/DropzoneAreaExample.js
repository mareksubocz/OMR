import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
 
class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
      // alert(files);
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        />
    )
  }
}
 
export default DropzoneAreaExample;
