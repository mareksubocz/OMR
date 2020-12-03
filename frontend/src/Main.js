import React from "react";
import DropzoneAreaExample from './DropzoneAreaExample';
import DropzoneDialogExample from './DropzoneDialogExample';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

function Main(){
    return (
    <Grid container component="main" className="root">
        <CssBaseline/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} >
            <div className="pole">
                <DropzoneAreaExample/>
            </div>
            <div className="metrum">
                <Grid container>
                    <Grid item xs>
                        Metrum: 
                    </Grid>
                    <Grid item>
                        <div className="liczba">
                            <TextField type="number"/>
                        </div>
                        <div className="liczba">
                            <TextField type="number"/>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="submit">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Analyze
            </Button>
            </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className="image" />
    </Grid>




    // <div class="pole">
    //     <Grid container spacing={2}>
    //         fdajkfsl
    //         <Grid item xs={6} component={Paper}>
    //             <Button>
    //                 Poniżej wgraj zdjęcie, które program ma przeanalizować.
    //             </Button>
    //             <div className="ala">
    //                 <DropzoneAreaExample className="pole"/>
    //             </div>
    //             <DropzoneDialogExample/>
    //         </Grid>
    //         <Grid item xs={6}>
    //         <h1>Jakaś lista</h1>
    //         <ul className="header">
    //             <li><a href="/">Home</a></li>
    //             <li><a href="/stuff">Stuff</a></li>
    //             <li><a href="/contact">Contact</a></li>
    //         </ul>
    //         <div className="content">

    //         </div>
    //         </Grid>
    //     </Grid>
    // </div>
    );
}
 
export default Main
