import React, {useState} from "react";
import DropzoneAreaExample from './DropzoneAreaExample';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loader from 'react-loader-spinner'
import SplitPane from 'react-split-pane';
import XMLLogo from './img/MusicXMLlogo.png'
import MIDILogo from './img/MIDILogo.png'
import axios from 'axios'


function Main(){
    var [image, setImage] = useState();
    var [loading, setLoading] = useState(false);
    var [ready, setReady] = useState(false);

    function handleButton(){
        if(image === undefined || !image.length){
            alert("Please provide an image first!")
            return
        }
        // TODO: Rzucamy POST
        setLoading(true)
        setReady(false)
        // TODO: Ładujemy GET
        setLoading(false)
        setReady(true)
    }

    function handleDropzoneChange(file){
        setImage(file)
    }
    function handleDropzoneDelete(){
        setImage(undefined)
    }

    return (
        <div className="root">
            <CssBaseline/>
            <SplitPane split="vertical" minSize="50%" className="splitpane">
                <div className="lewa">
                    <Paper className="paper" elevation={3} square={true}>
                        <DropzoneAreaExample 
                            handleDelete={handleDropzoneDelete} 
                            handleChange={handleDropzoneChange}
                        />
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
                    </Paper>
                </div>
                <div className="prawa">
                    <Loader 
                        style={{display: loading ? '': 'none'}}
                        type="TailSpin" 
                        color="white" 
                        width="100"
                        height="100"
                        className="loader"
                    />
                    <div className="przyciski">
                        <a download href="./data/Carol_of_the_Bells.mxl">
                            <Button>
                                <div style={{display: ready ? 'flex': 'none'}} 
                                    className="downloadButton"
                                >
                                    <img src={XMLLogo} alt="logo" className="logo"/>
                                    DOWNLOAD MusicXML
                                </div>
                            </Button>
                        </a>
                        <a download href="./data/Carol_of_the_Bells.mid">
                            <Button>
                                <div style={{display: ready ? 'flex': 'none'}} 
                                    className="downloadButton"
                                >
                                    <img src={MIDILogo} alt="logo" className="logo"/>
                                    DOWNLOAD MIDI
                                </div>
                            </Button>
                        </a>
                    </div>
                </div>
            </SplitPane>
        </div>
    );
}
 
export default Main
