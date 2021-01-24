import React, {useState} from "react";
import DropzoneAreaExample from './DropzoneAreaExample';
// import DropzoneDialogExample from './DropzoneDialogExample';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Box from '@material-ui/core/Box';
import axios from 'axios'



function Main(){
    var [image, setImage] = useState();

    function handleButton(){
        alert(image[0])
        axios.post('localhost:5000', image[0])
    }

    function handleDropzoneChange(file){
        setImage(file)
        alert(image)
    }

    return (
    <Grid container component="main" className="root">
        <CssBaseline/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} class="paper">
            <div className="pole">
                <DropzoneAreaExample handleChange={handleDropzoneChange}/>
            </div>
            <div className="submit">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => { handleButton() }}
            >
                Analyze
            </Button>
            </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7}/>
    </Grid>
    );
}
 
export default Main
